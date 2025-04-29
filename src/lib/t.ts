export interface Person {
	name: string;
	role:string;
	extension: string;
	thumbnail: string;
	botDesc: string;
	thumbnailPosX: string;
	thumbnailPosY: string;
	image: string;
}

export interface Server {
	server_host: string;
	server_port: number;
	username: string;
	password: string;
}
