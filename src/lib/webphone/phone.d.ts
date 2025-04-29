export class WebPhone {
    calls: Call[]
    
    constructor(configuration: Configuration)

    protected pushToCallList(calls: Call[], call: Call | undefined): Call[]
    protected updateCallList(calls: Call[], call: Call | undefined): Call[]
    protected cleanUp(calls: Call[], call: string | Call): Call[]

    register(config: RegisterConfig): Promise<void>
    unregister(): Promise<void>

    makeCall(address: string): Promise<void> // dial a new call, values: 1001, 1002, ...
    acceptCall(call: Call): Promise<void> // accept incoming call
    declineCall(call: Call): Promise<void> // used for declining incoming call
    hangupCall(call: Call): Promise<void>

    isHeld(call:Call): boolean
    isMuted(call:Call): boolean

    mute(call: Call): void
    unmute(call: Call): void
    toggleMute(call: Call): void

    hold(call: Call): Promise<void>
    unhold(call: Call): Promise<void>
    toggleHold(call: Call): Promise<void>
}