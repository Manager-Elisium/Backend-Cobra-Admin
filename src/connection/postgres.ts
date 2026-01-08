import { error, info } from "src/common/logger";
import { AppDataSource } from "../lib/ormconfig";

async function connectToDatabase(): Promise<Boolean> {
    try {
        let connection = await AppDataSource.initialize();
        info('Database Connection Established Successfully...', connection.isInitialized);
        return connection.isInitialized;
    } catch (errors) {
        error('Failed to connect to database:', errors);
        return false;
    }
}

export { connectToDatabase };