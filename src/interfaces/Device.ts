export interface Device {
	id: number;
	device: string;
	account_id: number;
	activation_date: Date;
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
