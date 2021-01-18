export interface Employee {
    Id: number;
    Code: string;
    Name: string;
    Job: string;
    Salary: number;
    Department: string;
}

export interface Response {
    records: Employee[];
    filtered: number;
    total: number;
}

export interface Options {
    orderBy: string;
    orderDir: 'ASC' | 'DESC';
    search: string,
    size: number,
    page: number;
}
