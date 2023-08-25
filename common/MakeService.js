export class MakeService {
  supabaseProjectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  vehicleMakeSupabaseUrl = `${this.supabaseProjectUrl}/VehicleMake`;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getMakes(params) {
    const response = await this.httpClient.get(
      this.vehicleMakeSupabaseUrl,
      params || ""
    );

    if (response instanceof Error) {
      return response.message;
    }

    return response;
  }

  async addMake(data) {
    const response = await this.httpClient.post(
      this.vehicleMakeSupabaseUrl,
      data
    );

    if (response instanceof Error) {
      return response.message;
    }
  }

  async deleteMake(params) {
    const response = await this.httpClient.delete(
      this.vehicleMakeSupabaseUrl,
      `?name=eq.${params.name}&abrv=eq.${params.abrv}`
    );

    if (response instanceof Error) {
      return response.message;
    }
  }

  async editMake(data, selected) {
    const response = await this.httpClient.patch(
      `${this.vehicleMakeSupabaseUrl}?name=eq.${selected.name}&abrv=eq.${selected.abrv}`,
      data
    );

    if (response instanceof Error) {
      return response.message;
    }
  }
}
