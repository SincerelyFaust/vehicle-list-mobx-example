export class HttpClient {
  supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.supabaseApiKey}`,
          apikey: this.supabaseApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.details);
      }
    } catch (error) {
      return error;
    }
  }

  async patch(url, data) {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.supabaseApiKey}`,
          apikey: this.supabaseApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.details);
      }
    } catch (error) {
      return error;
    }
  }

  async delete(url, params) {
    try {
      const response = await fetch(`${url}${params}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.supabaseApiKey}`,
          apikey: this.supabaseApiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.details);
      }
    } catch (error) {
      return error;
    }
  }

  async get(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.supabaseApiKey}`,
          apikey: this.supabaseApiKey,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.details);
      }

      return responseData;
    } catch (error) {
      return error;
    }
  }
}
