export interface ICategories {
  gif: {
    type: string;
    id: string;
    images: {
      preview_gif: {
        url: string;
      };
      downsized_medium: {
        url: string;
      };
    };
  };
  name: string;
  name_encoded: string;
}
