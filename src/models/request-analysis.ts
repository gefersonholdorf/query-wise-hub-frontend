export interface RequestAnalysis {
	id: number;
	problems: string[];
	solution: string;
	tags: string[];
	status: "PENDING" | "APPROVED" | "DENIED";
	observation: string | null;
	createdBy: string;
	createdAt: Date;
}
