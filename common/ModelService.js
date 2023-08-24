export class ModelService {
  supabaseProjectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  vehicleModelSupabaseUrl = `${this.supabaseProjectUrl}/VehicleModel`;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getModels() {
    const response = await this.httpClient.get(this.vehicleModelSupabaseUrl);

    if (response instanceof Error) {
      return response.message;
    }

    return response;
  }

  async addModel(data) {
    const response = await this.httpClient.post(
      this.vehicleModelSupabaseUrl,
      data
    );

    if (response instanceof Error) {
      return response.message;
    }
  }

  async deleteModel(params) {
    const response = await this.httpClient.delete(
      this.vehicleModelSupabaseUrl,
      `?name=eq.${params.name}&abrv=eq.${params.abrv}&makeid=eq.${params.makeid}`
    );

    if (response instanceof Error) {
      return response.message;
    }
  }

  async editModel(data, selected) {
    const response = await this.httpClient.patch(
      `${this.vehicleModelSupabaseUrl}?name=eq.${selected.name}&abrv=eq.${selected.abrv}&makeid=eq.${selected.makeid}`,
      data
    );

    if (response instanceof Error) {
      return response.message;
    }
  }
}
