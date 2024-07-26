export const questions = [
  {
    num: 1,
    question: 'سطح تحصیلات شما ؟',
    options: [
      { lable: 'زیر دیپلم', value: 1 },
      { lable: 'دیپلم', value: 2 },
      { lable: 'فوق دیپلم', value: 3 },
      { lable: 'کارشناسی', value: 4 },
      { lable: 'کارشناسی ارشد', value: 5 },
      { lable: 'دکتری', value: 6 },
    ],
  },
  {
    num: 2,
    question: 'معمولًا وضعیت پس انداز شما به چه صورت است؟',
    options: [
      { lable: 'درآمدهای معمول من به میزانی نبوده است که بتوانم پس اندازی داشته باشم.', value: 1 },
      { lable: 'معمولا بیش از 50 % پس انداز من به صورت نقد و شبه نقد (شامل سپردۀ بانکی و اوراق مشارک) بوده است.', value: 2 },
      { lable: 'معموالا کمتر از 50 % پس انداز من به صورت نقد و شبه نقد(شامل سپردۀ بانکی و اوراق مشارکت) بوده است', value: 3 },
      { lable: 'اصولا پس انداز خود را به صورت نقد یا شبه نقد نگهداری نمی کنم و در اولین فرصت آن را در سایر دارایی های مالی یا دارایی های فیزیکی مختلف سرمایه گذاری می کنم', value: 4 },
    ],
  },
  {
    num: 3,
    question: 'فکر میکنید تا چه حد برای تامین هزینه های معمول زندگی تان به درآمد این سرمایه گذاری وابسته باشید؟',
    options: [
      { lable: 'درآمد اصلی من از فعالیت دیگری است که اصوالا کفاف هزینه های عادی زندگی مرا می دهد.', value: 1 },
      { lable: 'کمی به درآمد این سرمایه گذاری وابسته هستم، به عبارتی درآمد این سرمایه گذاری میتواند کمک خرج من باشد.', value: 2 },
      { lable: 'تقریبا به درآمد این سرمایه گذاری برای تامین هزینه های معمول زندگی ام وابسته ام و به عنوان یک درآمد دوم روی آن حساب می کنم.', value: 3 },
      { lable: 'به شدت به درآمد این سرمایه گذاری وابسته ام و برای تامین هزینه های معمول زندگی ام به این سرمایه گذاری متکی هستم.', value: 4 },
    ],
  },
  {
    num: 4,
    question: 'دیدگاه شما هنگام انجام یک سرمایه گذاری چیست؟',
    options: [
      { lable: 'می خواهم سرمایه گذاری مطمئنی داشته باشم که بازدهی معقولی برای من ایجاد کند.', value: 1 },
      { lable: 'می خواهم ارزش سرمایه گذاری ام در بلندمدت رشد کند. از نظر من نوسانات بازده در کوتاه مدت قابل قبول هستند.', value: 2 },
      { lable: 'من در پی رشد ارزش سرمایه گذاری در بلندمدت به صورت جسورانه هستم و آمادگی پذیرش نوسانات قابل ملاحظه بازار را هم دارم.', value: 3 },
    ],
  },
  {
    num: 5,
    question: 'اگر ناچار باشید بین دو شغل، یکی با امنیت شغلی بال و حقوق معقول و دیگری با امنیت کمتر ولی حقوق بال، یکی را انتخاب نمایید، کدامیک را برمی گزینید؟',
    options: [
      { lable: 'یقینا شغل با حقوق بالاتر و امنیت کمتر را', value: 1 },
      { lable: 'احتمالا شغل با حقوق بالاتر و امنیت کمتر را', value: 2 },
      { lable: 'باید سایر جنبه ها را در نظر بگیرم', value: 3 },
      { lable: 'یقینا شغل دارای امنیت بیشتر و حقوق کمتر را', value: 4 },
    ],
  },
  {
    num: 6,
    question: 'اگر پس اندازی داشته باشید که آن را طی چند سال به دست آورده باشید، چگونه آن را سرمایه گذاری میکنید؟',
    options: [
      { lable: 'در دارائی های کم ریسک مانند سپرده بانکی یا اوراق بهادار با درآمد ثابت', value: 1 },
      { lable: 'در دارائی های با ریسک متوسط مانند واحدهای صندوقهای سرمایه گذاری مشترک', value: 2 },
      { lable: 'در دارائی های با ریسک زیاد مانند سهام شرکتها', value: 3 },
      { lable: 'در دارائی های با ریسک خیلی زیاد مانند قراردادهای آتی و اوراق اختیار معامله', value: 4 },
    ],
  },
  {
    num: 7,
    question: 'میزان آشنایی شما با امور سرمایه گذاری در اوراق بهادار چقدر است؟',
    options: [
      { lable: 'به هیچ وجه با سرمایه گذاری در اوراق بهادار آشنایی ندارم.', value: 1 },
      { lable: 'تا حدودی با سرمایه گذاری در اوراق بهادار آشنا هستم ولی درک کاملی از آن ندارم.', value: 2 },
      { lable: 'با سرمایه گذاری در اوراق بهادار آشنا هستم. عوامل مختلفی که بر بازده سرمایه گذاری مؤثر هستند را درک میکنم.', value: 3 },
      { lable: 'آشنایی زیادی با سرمایه گذاری در اوراق بهادار دارم. در اتخاذ تصمیمات سرمایه گذاری خود، از تحقیقات انجام شده و سایر اطلاعات مرتبط استفاده میکنم. عوامل مختلفی که بر بازده سرمایه گذاری مؤثر هستند را درک میکنم.', value: 4 },
    ],
  },
  {
    num: 8,
    question: 'اگر ارزش سرمایه گذاری شما در یک دورۀ کوتاه مدت – مثلا سه ماه- 40 درصد کاهش یابد، چه عکس العملی خواهید داشت؟(اگر در گذشته چنین چیزی را تجربه کرده اید، همان واکنشی را که انجام دادید انتخاب نمایید)',
    options: [
      { lable: 'تمامی سرمایه گذاری خود را می فروشید و تمایلی به پذیرش ریسک بیشتر ندارید.', value: 1 },
      { lable: 'قسمتی از سرمایه گذاری خود را فروخته و مبلغ آن را در دارایی های کم ریسک تر سرمایه گذاری می کنید.', value: 2 },
      { lable: 'به امید بهبود شرایط، سرمایه گذاری خود را نمی فروشید.', value: 3 },
      { lable: 'مبلغ دیگری به سرمایه گذاری خود اضافه کرده و سعی میکنید بهای تمام شده خود را کاهش دهید.', value: 4 },
    ],
  },
  {
    num: 9,
    question: 'مبلغ پرتفوی سرمایه گذاری شما در بورس چقدر میباشد؟',
    options: [
      { lable: 'زیر 500 میلیون تومان', value: 1 },
      { lable: 'بین 500 تا 2 میلیارد تومان', value: 2 },
      { lable: 'بین 2 تا 5 میلیارد تومان', value: 3 },
      { lable: 'بین 5 تا 10 میلیارد تومان', value: 4 },
      { lable: 'بالاتر از 10 میلیارد تومان', value: 5 },
    ],
  },
];