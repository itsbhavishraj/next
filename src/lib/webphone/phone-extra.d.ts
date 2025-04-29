interface SimpleConfiguration {
	mediaConfig?: MediaConfig;
	eventSubscription?: EventSubscription;
}

interface MediaConfig {
	remoteAudioElement: HTMLAudioElement;
}

interface EventSubscription {
	onConnectionEvent(e: ConnectionEvent): void;
	onCallEvent(e: CallEvent): void;
}

interface ConnectionEvent {
	event_name: string; // registered, unregistered, connected, disconnected
}

interface CallEvent {
	event_name: string; // incoming_call, answered, call_hold, hangup
	call_id: string; // unique ID for a call session
	held?: boolean; // this key will only exist in event_name: call_hold
}

interface RegisterConfig {
	server: ServerConfig;
	user: UserConfig;
}

interface ServerConfig {
	host: string;
	port: string;
	iceServers?: string[];
}

interface UserConfig {
	name: string;
	password: string;
}

interface Call {
	id: string;
	type: string; // incoming, outgoing
	state: PhoneState;
	remoteDisplayName: string;
}

interface PhoneState {
	value: string;
	// there are other fields in this type but can be ignored
}

/*
The call state value can be accessed by 'call.state.value' which is a string.
Possible values are
- ringing : when the call is ringing either incoming / outgoing
- call : when the call is in answered state
- hangup: when the call hangs up
*/
