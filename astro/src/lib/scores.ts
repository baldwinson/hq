import fs from 'node:fs';
import path from 'node:path';

export interface Provider {
	name: string;
	policyBenefits: number;
	ergDepth: number;
	leadershipIntegrity: number;
	workerDignity: number;
	externalAdvocacy: number;
	weightedScore: number;
}

export interface ScoreReport {
	providers: Provider[];
	reportDate: string;
	reportMonth: string;
	reportYear: string;
}

export function getAvailableReports(): string[] {
	const scoresDir = path.join(process.cwd(), 'public/scores');
	
	if (!fs.existsSync(scoresDir)) {
		return [];
	}
	
	return fs.readdirSync(scoresDir)
		.filter(file => file.endsWith('.csv'))
		.sort()
		.reverse();
}

export function getLatestReport(): string | null {
	const reports = getAvailableReports();
	return reports.length > 0 ? reports[0] : null;
}

export function parseReportFilename(filename: string): { month: string; year: string } | null {
	const match = filename.match(/cloud-scores_(\d{4})-(\d{2})\.csv/);
	if (!match) return null;
	
	const year = match[1];
	const monthNum = parseInt(match[2], 10);
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
		'July', 'August', 'September', 'October', 'November', 'December'];
	
	return {
		year,
		month: monthNames[monthNum - 1] || 'Unknown'
	};
}

export function loadScoreReport(filename: string): ScoreReport | null {
	const csvPath = path.join(process.cwd(), 'public/scores', filename);
	
	if (!fs.existsSync(csvPath)) {
		return null;
	}
	
	const csvContent = fs.readFileSync(csvPath, 'utf-8');
	const lines = csvContent.trim().split('\n');
	
	if (lines.length < 2) {
		return null;
	}
	
	const providers: Provider[] = lines.slice(1).filter(line => line.trim()).map(line => {
		const values = line.split(',');
		return {
			name: values[0],
			policyBenefits: parseFloat(values[1]),
			ergDepth: parseFloat(values[2]),
			leadershipIntegrity: parseFloat(values[3]),
			workerDignity: parseFloat(values[4]),
			externalAdvocacy: parseFloat(values[5]),
			weightedScore: parseFloat(values[6])
		};
	}).sort((a, b) => b.weightedScore - a.weightedScore);
	
	const dateInfo = parseReportFilename(filename);
	
	return {
		providers,
		reportDate: dateInfo ? `${dateInfo.month} ${dateInfo.year}` : 'Unknown',
		reportMonth: dateInfo?.month || 'Unknown',
		reportYear: dateInfo?.year || 'Unknown'
	};
}

export function loadLatestScoreReport(): ScoreReport | null {
	const latestFile = getLatestReport();
	if (!latestFile) return null;
	return loadScoreReport(latestFile);
}

export function getTier(score: number): string {
	if (score >= 80) return "Strong";
	if (score >= 65) return "Moderate";
	if (score >= 50) return "Concerning";
	return "Poor";
}

export function getTierColor(tier: string): string {
	switch (tier) {
		case "Strong": return "text-green-600";
		case "Moderate": return "text-amber-500";
		case "Concerning": return "text-orange-500";
		case "Poor": return "text-red-500";
		default: return "text-foreground/60";
	}
}

export function getScoreBarColor(score: number): string {
	if (score >= 80) return "bg-green-600";
	if (score >= 65) return "bg-amber-500";
	if (score >= 50) return "bg-orange-500";
	return "bg-red-600";
}

export function getCategoryColor(score: number): string {
	if (score >= 80) return "text-green-600";
	if (score >= 65) return "text-amber-500";
	if (score >= 50) return "text-orange-500";
	return "text-red-500";
}
