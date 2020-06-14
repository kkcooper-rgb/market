import request from "./request";


// 请求detail组件的数据
export const reqCategory = () => request('/category');

export const reqSubcategory = maitKey => request('/subcategory', { maitKey });

export const reqCategoryDetail = (miniWallkey, type) => request('/subcategory/detail', { miniWallkey, type });
