export interface Complaints {
    id: string;
    customerId: string;
    complaintOpenDateTime: Date;
    complaintStatus: number;
    assignedTo: string;
    opendBy: string;
    resolvedDate: Date
}
