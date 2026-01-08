
import "reflect-metadata"
import { DataSource } from "typeorm"
import { MultiGames } from "../../domain/games.entity";
import { Setting } from "src/domain/setting.entity";
// import { TermsAndConditions } from "src/domain/tearms_conditions.entity";
import { Reward } from "src/domain/reward.entity";
import { Lobby } from "src/domain/lobby.entity";
import { Mission } from "src/domain/mission.entity";
import { VipCard } from "src/domain/vip-card.entity";
import { Shop } from "src/domain/shop.entity";
import { VipCardBenefits } from "src/domain/vip-card-benefits.entity";
import { Notification } from "src/domain/notification.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST ?? "localhost",
    port: Number(process.env.PGPORT) ?? 5432,
    username: process.env.PGUSER ?? "postgres",
    password: process.env.PGPASSWORD ?? "12345678",
    database: process.env.PGDATABASE ?? "cobra_admin_local",
    synchronize: true,
    logging: false,
    entities: [MultiGames, Setting, Reward, Lobby, Mission, VipCard, VipCardBenefits, Shop, Notification],
    migrations: [],
    subscribers: [],

});
