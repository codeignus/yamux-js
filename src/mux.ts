import {initialStreamWindow} from './constants';

export interface Config {
    // AcceptBacklog is used to limit how many streams may be
    // waiting an accept.
    // WARNING [Difference with the Go implementation]: total number of streams, not in-flight
    acceptBacklog?: number;

    // EnableKeepalive is used to do a period keep alive
    // messages using a ping.
    enableKeepAlive?: boolean;

    // KeepAliveInterval is how often to perform the keep alive
    keepAliveInterval?: number; // In seconds

    // ConnectionWriteTimeout is meant to be a "safety valve" timeout after
    // we which will suspect a problem with the underlying connection and
    // close it. This is only applied to writes, where's there's generally
    // an expectation that things will move along quickly.
    connectionWriteTimeout?: number; // In seconds

    // MaxStreamWindowSize is used to control the maximum
    // window size that we allow for a stream.
    maxStreamWindowSize?: number;

    // StreamOpenTimeout is the timeout for establishing a new stream.
    // If a stream is not established within this timeout, the session is closed.
    streamOpenTimeout?: number; // In seconds

    // StreamCloseTimeout is the timeout for closing a stream.
    // If a stream is not fully closed within this timeout after sending FIN,
    // it will be forcibly closed to prevent memory leaks from misbehaving peers.
    streamCloseTimeout?: number; // In seconds

    // Logger is used to pass in the logger to be used.
    logger?: typeof console.log;
}

export const defaultConfig = {
    acceptBacklog: 256,
    enableKeepAlive: true,
    keepAliveInterval: 30, // In seconds
    connectionWriteTimeout: 10, // In seconds
    maxStreamWindowSize: initialStreamWindow,
    streamOpenTimeout: 5 * 60, // In seconds, 0 means disabled
    streamCloseTimeout: 70, // In seconds, 0 means disabled
    logger: console.log,
};
