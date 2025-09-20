export interface Knowledge {
	id: string;
	payload: {
		problem: string;
		solution: string;
		createdAt: string;
		updatedAt: string;
		status: boolean;
	};
}
