export default {
  'post /api/user/detail': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 10,
        username: '测试用户',
        avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3521319392,1160740190&fm=26&gp=0.jpg',
        tel: '17621343333',
        sign: '路漫漫其修远其,吾将上下而求索',
      },
    });
  },
  'post /api/user/edit': (req, res) => {
    res.json({
      status: 200,
      data: 'ok',
    });
  },
  'post /api/user/login': (req, res) => {
    res.json({
      status: 200,
      data: 'ok',
    });
  },
  'post /api/user/register': (req, res) => {
    res.json({
      status: 200,
      data: 'ok',
    });
  },
};
