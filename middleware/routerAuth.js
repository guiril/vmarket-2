import axios from 'axios';

export default async ({ route, redirect }) => {
  if (route.meta[1].requiresAuth) {
    // 檢查登入狀態
    const res = await axios.post('https://vue-course-api.hexschool.io/api/user/check');
    if (!res.data.success) {
      redirect('/login');
    }
  }
};
