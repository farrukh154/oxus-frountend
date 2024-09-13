export default class TableConfigService {
  static getTableConfig(modelName: string) {
    const configKey = `${modelName}_tableConfig`;
    const config = localStorage.getItem(configKey);
    return config ? JSON.parse(config) : null;
  }

  static saveTableConfig(modelName: string, config: any) {
    const configKey = `${modelName}_tableConfig`;
    localStorage.setItem(configKey, JSON.stringify(config));
  }

  static removeTableConfig(modelName: string) {
    const configKey = `${modelName}_tableConfig`;
    localStorage.removeItem(configKey);
  }
}
