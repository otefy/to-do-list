export interface Task {
    id: string;
    title: string;
    body?: string;
    status: 'Todo' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'Urgent';
    creationDate: Date;
}
