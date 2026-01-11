"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
require("./module-alias");
const app_1 = require("./app");
const postgres_1 = require("./connection/postgres");
const logger_1 = require("./common/logger");
const SERVER_SHUTDOWN_TIMEOUT_MS = 10000;
/**
 * Helper function to log an exit code before exiting the process.
 */
const logAndExitProcess = (exitCode) => {
    (0, logger_1.error)('Exiting process', {
        exit_code_number: exitCode
    });
    process.exit(exitCode);
};
/**
 * Returns a promise that attempts to shut an http server down,
 * resolving if it succeeded and rejecting if it failed or timed out.
 */
const shutdownServerWithTimeout = (server) => __awaiter(void 0, void 0, void 0, function* () {
    return Promise.race([
        // P.fromCallback((cb) => server.close(cb)),
        new Promise((resolve, reject) => setTimeout(() => reject(Error('Timeout shutting server')), SERVER_SHUTDOWN_TIMEOUT_MS))
    ]);
});
/**
 * Helper function to setup signal handlers on the process to gracefully
 * shutdown the server.
 */
const setupSignalHandlers = (server) => {
    process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, logger_1.info)('Received signal: SIGTERM');
        try {
            yield shutdownServerWithTimeout(server);
            logAndExitProcess(0);
        }
        catch (err) {
            (0, logger_1.error)(err, 'Failed to shutdown server');
            logAndExitProcess(1);
        }
    }));
    process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, logger_1.info)('Received signal: SIGINT');
        try {
            yield shutdownServerWithTimeout(server);
            logAndExitProcess(0);
        }
        catch (err) {
            (0, logger_1.error)(err, 'Failed to shutdown server');
            logAndExitProcess(1);
        }
    }));
};
/**
 * Sets up event listeners on unexpected errors and warnings. These should theoretically
 * never happen. If they do, we assume that the app is in a bad state. For errors, we
 * exit the process with code 1.
 */
const setupProcessEventListeners = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.on('unhandledRejection', (reason) => {
        (0, logger_1.warning)('encountered unhandled rejection', { reason_object: reason });
        logAndExitProcess(1);
    });
    process.on('uncaughtException', (err) => {
        (0, logger_1.error)(err.toString(), 'encountered uncaught exception');
        logAndExitProcess(1);
    });
    process.on('warning', (err) => {
        (0, logger_1.warning)('encountered warning', {
            warning_object: err
        });
    });
};
/**
 * Start an Express server and installs signal handlers on the
 * process for graceful shutdown.
 */
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = yield (0, app_1.createApp)();
        const server = app.listen(app.get('port'), () => {
            (0, logger_1.info)('Started express server', {
                port_number: app.get('port'),
                env_string: app.get('env')
            });
        });
        setupSignalHandlers(server);
        setupProcessEventListeners();
        const connectDB = yield (0, postgres_1.connectToDatabase)();
        if (!connectDB) {
            process.exit(0);
        }
    }
    catch (err) {
        (0, logger_1.error)(err, 'error caught in server.ts');
    }
}))();
//# sourceMappingURL=server.js.map