import { json } from '@sveltejs/kit';
import yaml from 'js-yaml';
import { Octokit } from '@octokit/rest';
import type { RequestHandler } from '@sveltejs/kit';
import { GITHUB_OWNER, GITHUB_BRANCH, GITHUB_REPO } from '$lib/config';
import { GITHUB_TOKEN } from '$env/static/private';

const owner = GITHUB_OWNER;
const repo = GITHUB_REPO;
const mainBranch = GITHUB_BRANCH;
const token = GITHUB_TOKEN;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, url, owner: ghOwner } = await request.json();

		if (!name || !url || !ghOwner) {
			return json({ message: 'Missing fields' }, { status: 400 });
		}

		if (!token) throw new Error('No GitHub token configured');

		const octokit = new Octokit({ auth: token });

		// 1. Get the current file content
		const fileData = await octokit.repos.getContent({
			owner,
			repo,
			path: 'data/sites.yaml',
			ref: mainBranch
		});

		const sha = (fileData.data as any).sha;
		const content = Buffer.from((fileData.data as any).content, 'base64').toString('utf8');
		const parsed = yaml.load(content) as { sites: any[] };

		// 2. Add new entry
		parsed.sites.push({ name, url, owner: ghOwner });

		const newYaml = yaml.dump(parsed);

		// 3. Create a new branch
		const branchName = `add-site-${name.toLowerCase().replace(/\s+/g, '-')}`;
		const { data: ref } = await octokit.git.getRef({ owner, repo, ref: `heads/${mainBranch}` });
		await octokit.git.createRef({
			owner,
			repo,
			ref: `refs/heads/${branchName}`,
			sha: ref.object.sha
		});

		// 4. Commit new version
		await octokit.repos.createOrUpdateFileContents({
			owner,
			repo,
			path: 'data/sites.yaml',
			message: `Add new site: ${name}`,
			content: Buffer.from(newYaml, 'utf8').toString('base64'),
			branch: branchName,
			sha
		});

		// 5. Create PR
		await octokit.pulls.create({
			owner,
			repo,
			head: branchName,
			base: mainBranch,
			title: `Add new site: ${name}`,
			body: `Proposing to monitor [${name}](${url}) owned by @${ghOwner}`
		});

		return json({ message: '✅ Pull request created successfully!' });
	} catch (err: any) {
		console.error(err);
		return json({ message: err.message }, { status: 500 });
	}
};
