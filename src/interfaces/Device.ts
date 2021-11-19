export interface Device {
	id: number;
	device: string;
	account_created_id: number;
	owner_id: number;
	activation_date: Date;
	unique_id: string;
	state: boolean;
	qr_code: null;
	averages: Averages;
	data_item?: DataItem[];
}

export interface Averages {
	quality__avg: number;
	humidity__avg: number;
	temperature__avg: number;
	warm__avg: number;
	concentration__avg: number;
}


export interface DataItem {
	id: number;
	district_id: number;
	device_id: number;
	latitude: string;
	longitude: string;
	quality: number;
	date_time: Date;
	humidity: string;
	temperature: string;
	warm: string;
	concentration: string;
	smoke_sensor: boolean;
	methane_sensor: boolean;
	difference_quality: number;
}

export interface ApiResponse {
	count: number;
	countItemsOnPage: number;
	total_pages: number;
	current: number;
	next: null;
	previous: null;
}
