import { error, info } from "src/common/logger";
import { AppDataSource } from "../lib/ormconfig";

async function connectToDatabase(): Promise<Boolean> {
    try {
        let connection = await AppDataSource.initialize();
        info('Database Connection Established Successfully...', connection.isInitialized);
        return connection.isInitialized;
    } catch (errors) {
        error('Failed to connect to database:', {
            message: errors instanceof Error ? errors.message : String(errors),
            stack: errors instanceof Error ? errors.stack : undefined
        });
        return false;
    }
}

export { connectToDatabase };