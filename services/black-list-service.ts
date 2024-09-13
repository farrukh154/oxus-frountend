import ApiFactory from "../factories/api-factory";
import {z} from "zod";

class BlackListService {
	async search(name: string, matchPercentage: int) {
		if (!this.validateSearchRequestData(name, matchPercentage)) {
			console.log(name, matchPercentage);
			throw new Error("Data Validation failed");
		}

		return this.sendRequest(name, matchPercentage);
	}

	private async sendRequest(name: string, matchPercentage: int) {
        let apiClient = ApiFactory.build();
        return apiClient.blackList.search(name, matchPercentage);
    }

    private validateSearchRequestData(name: string, matchPercentage: int) {
    	const nameRule = z.string().min(3);
        const matchPercentageRule = z.number().int().positive();
        
        try {
            nameRule.parse(name);
            matchPercentageRule.parse(matchPercentage);
        } catch (e) {
            return false;
        }

        return true;
    }
}

export default BlackListService;