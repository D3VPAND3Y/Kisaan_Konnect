const mongoose = require('mongoose');
const  Product  = require("./models/product_model");

mongoose.connect('mongodb+srv://ayush123:ayush123@cluster0.kpwm74z.mongodb.net/Kisaan_DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


const seedProducts = async () => {
    try{
      await Product.deleteMany({});
        console.log("Products deleted");
        const farmerProducts = [
          {
            title: 'Fertilizers',
            items: [
              {
                id: 1,
                name: 'Urea',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ3IQogFhjVuLTqoJ-dx7GvxSOpm5VL3n1B4o8dTvLwIhD_Yr_awAg3nqmhVlcuGWu0Q5zKU9kHzXckQ7SyUNoKUfq495fXTGPl7ouqzTCItUo0qQh35lL9jw&usqp=CAE',
                price: 500, // ₹ per 50kg bag
              },
              {
                id: 2,
                name: 'DAP (Di-Ammonium Phosphate)',
                imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTNDEwxWscoYYzTBpmdYCpxP8A463_K9xuL5xn8d_sCSWY_o7AEviNhUp3_p1WTmqyodpipxK56pIxOE7OL0fC3SejY_HTctFZizo7RyLIsZgRIUSG15xsM&usqp=CAE',
                price: 1200, // ₹ per 50kg bag
              },
              {
                id: 3,
                name: 'Potash',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQpVZ91KrGi1Im-pP-eS5u-jB_SKI6wbVKtpklVxpFJ6h63DDaXD2H4Ndc_CCZiRm2dlnWNgaQqGayBEH1dPt997LQjU0NSzrcvvZUBfyzd0ufTv-xGwqmBKQ&usqp=CAE',
                price: 900, // ₹ per 50kg bag
              },
              {
                id: 4,
                name: 'NPK Fertilizer',
                imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ86C7s6hTaqK92RV6acqEIUe5EqSKzb7BaKlC7FdXD8YSI80sMgVFvh4LqogwHsNNDGPMR65l8ASw3Fd_GxmxIXY9cg9We3buEsHzu7yDPB2MkHaHnsi6ZRQ&usqp=CAE',
                price: 1000, // ₹ per 50kg bag
              },
            ],
          },
          {
            title: 'Seeds',
            items: [
              {
                id: 5,
                name: 'Wheat Seeds',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSaorUYASBQAhuvwjLrWv-ZHXSXidnEWb_jUxqB-7AEC6O_Zl0DCpv0jy0fbknx-MukAL-M1hEB0qst7_KB-YrYSziOdpfEigFbWw4Sua4hGPRNRlwPCAZznQ&usqp=CAE',
                price: 1500, // ₹ per 25kg bag
              },
              {
                id: 6,
                name: 'Rice Seeds',
                imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQQGqiDJE1I9IoVHVfTeW9i8bk-zThF9chJ22hRHN6SzA7fJBcFmlbtzJWCBc65C9EEC0GRZ70D4BCn4f4X7xCjrS4Q6zNI7rvXK67MTtpK7AorfzdJH2JvxQ&usqp=CAE',
                price: 1400, // ₹ per 25kg bag
              },
              {
                id: 7,
                name: 'Maize Seeds',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQJY8PMInW3WgKsN2F_w_aSWDQ7e3qwqyGIoegzsqlSKeQ05y6d5VnaqllqbThmHa1WOIeqWkw4xzY7ZwptYlVODMyUlxns30Y0iz6xW90&usqp=CAE',
                price: 1300, // ₹ per 25kg bag
              },
              {
                id: 8,
                name: 'Soybean Seeds',
                imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSxV_ej9y6X6s6bKwS-GGdf8DaICoVM2YeUl97SAlYNrYLG-Fzs8HriVennJ83MLmX6Pt7Ar69-_IIt9guf9Tm6unwMcw-CQhgEK3DOPEVQxYCWo-4SJIMv0w&usqp=CAE',
                price: 1600, // ₹ per 25kg bag
              },
              {
                id: 9,
                name: 'Watermelon Seeds',
                imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS2FNEuIgQDGRWcaXHLs27i0EGenws3A1m7UrL67uCYF7G5yV0fP4TOirFTPp20JvW-QiKWwUj__xbk0uEK-4yEVPvGmSO6blCYwFPQbUC-N1Z4RVjW5Jcw&usqp=CAE',
                price: 800, // ₹ per kg
              },
              {
                id: 10,
                name: 'Apple Seeds',
                imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQWsN5cFvssZPEVi1qWb0bvTqdijgfaxmZrk7VNbefifb4CklJW5TxaePWYiM_-WGd7Kd3oXEwENqPtRVPNCpwHSKlo5azkQCbnNY1YUskTMoVJ3TluR9Gv&usqp=CAE',
                price: 1200, // ₹ per kg
              },
              {
                id: 11,
                name: 'Jute Seeds',
                imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSWybJ1IFe8UpGXoEvHrtnrZ4OfkSZjOAs6vjSPNCJbYGngcdqFRWWeu7XVGiw0SOwfZ2gtk6Z9ky2IcBC51E1prMH4PT82H5p9H1DLeuI&usqp=CAE',
                price: 600, // ₹ per kg
              },
              {
                id: 12,
                name: 'Cotton Seeds',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRZvPPx3FeYecMl0L920EDGpcIyVa6v7FEDUw-9whYmp7_t2dCLthI11TJNgJwbpUVJSi_QQfGGX6aLYZSI4GkJoBDFT5NRsXXxUwTwV_p4OxesS1qALpZ7&usqp=CAE',
                price: 1800, // ₹ per kg
              },
              {
                id: 13,
                name: 'Chickpea Seeds',
                imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR7fRLLtW0SHoiIEpPcbpUiKXDOx6noIOZIGPRQm_OLYdd2Wopfbj44vhZ85bs-IRiR8mBCiB_FllocieBU7tv9lDbUEk9YDgYrIO0Pa-Xz8DofIb2NKg4M&usqp=CAE',
                price: 1200, // ₹ per kg
              },
              {
                id: 14,
                name: 'Mungbean Seeds',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRvGPB2bL5nnJJLOW1lJCjCGX4PAqlobzxiVmJvWDDWkwFFfJv0CVYAv8AXVW1WjnBQjN8G7SesqjqRujEoTyRuBLKLhxzIRZi6MqMEiIkEYmeCUAnV3Rytjw&usqp=CAE',
                price: 1500, // ₹ per kg
              },
              {
                id: 15,
                name: 'Kidney Bean Seeds',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQj-F5mnIoobYi_S9RaQPX_Zt_ALLhHpeqODMbovov4QbGTbI87bALcs0WURrlHNLeBVJlZ-omsiPkrKQBczIIFAUQB9yMHfQ&usqp=CAE',
                price: 1300, // ₹ per kg
              },
              {
                id: 16,
                name: 'Coconut Seeds',
                imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTkHgqHxMj833T0Vq_JArQno7RROXdUypH6MbYK-zhaSa-OcT2L_YQIvAy39t8d3NGxSx9sL-JjiQ4qwrOH-FXVpo47bcxgUIkLRhKGHpNm&usqp=CAE',
                price: 500, // ₹ per kg
              },
              {
                id: 17,
                name: 'Orange Seeds',
                imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR_qH9Fg-wV03x6CQK-baNDvg5g67W_lFGn34Ncu9kpy1kukdEFr0epNd9UYguIft5lLlztqXXeHSx7fJKlLktHGcFSFIKEIspe-UKV_hf1IguE94HxmEMMGw&usqp=CAE',
                price: 700, // ₹ per kg
              },
              {
                id: 18,
                name: 'Pigeon Peas Seeds',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSS6m_zPOx9LVikJUSxaqfLGFdrg9mZm1TGgcT2tABYvyE_ErW1EZM3cL6622kHRDmu7tz8VCvedo_n1o5__CrM-cIvNzOPOFSC30p40w1YHwgOhJCxFKi4sw&usqp=CAE',
                price: 900, // ₹ per kg
              },
              {
                id: 19,
                name: 'Black Gram Seeds',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRh4eh0yEMr-Lr8Pc4hQh78n9RCgFvjWiwgdi3-hFC2e8YZVQTOOOTpYYZJznST6FF73ssB1VD9HhtbogvkxO40_pwgsNQSwuIxSJin6gai1rLzNyBEt2-nKA&usqp=CAE',
                price: 1000, // ₹ per kg
              },
              {
                id: 20,
                name: 'Moth Beans Seeds',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSYzSjdLvGYIsSOTtImA6nSTedwqQ66S70DAEociLfucfZnCxICKKsAs66axtajZK526iLFcRvkOlHeckCS3sR5Knxk2iOaFpGZFvcY8YSMbrwihc4JSmXADg&usqp=CAE',
                price: 1100, // ₹ per kg
              },
              {
                id: 21,
                name: 'Lentil Seeds',
                imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT53KEKaxUGX81-43hYqznWLUafd0Juj8-JLu-HxooamwfEs7GZgrEj5AYg9nNHSmJZ1dK5AQu9gtBWzVR0uNoaNRHxXRzqvebQFidAiUE&usqp=CAE',
                price: 1000, // ₹ per kg
              },
              {
                id: 22,
                name: 'Mango Seeds',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR2RX6KW886BdY0ZOoVjJxFHqBasIwCFl3GSenNYlOl9XK-7BftK6FZVL5Ct1P8LkDPyTpPgLgLQx6ybjH_warrVdeeQ4f72vtCFh6FbzWbPfmKD8nkYkhT&usqp=CAE',
                price: 600, // ₹ per kg
              },
              {
                id: 23,
                name: 'Papaya Seeds',
                imageUrl: 'https://organicbazar.net/cdn/shop/products/Untitled-design-2022-11-30T154045.234.jpg?v=1694169212&width=990',
                price: 900, // ₹ per kg
              },
              {
                id: 24,
                name: 'Pomegranate Seeds',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQMAAlhzAG9oT5bR6sUvCFDgtrGBVC8S3vXzF_ym8zqxEWs89Z_yQF3QUFS1sVO6yiQJykIZMDiZnrpEYs7us0mdyd-CJlw9E_Fg2KbZ9li&usqp=CAE',
                price: 1500, // ₹ per kg
              },
            ],
          },
          {
            title: 'Farm Equipment',
            items: [
              {
                id: 25,
                name: 'Tractor',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRj5eBv1o4JAaijG9B9wlo46ZObdz1bvUiV8rSHO8KXWpXHTihmdt4P8n2QxQ_g7ip-WJbDE-B0-WX3mdNeMR9CVYVAwbvVqA&usqp=CAE',
                price: 500000, // ₹ per unit
              },
              {
                id: 26,
                name: 'Cultivator',
                imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRW9zDe9hGlmdhGRjptyZRWZtczyU8CdjaGDI03ELYUF6tFzgcM8eXHnV8d7ILrKhJlxHVjaiOCqoPkd5kFUbe-VDgS1X3FlxPCcDjk8dBUJ5nubMbefwap&usqp=CAE',
                price: 15000, // ₹ per unit
              },
              {
                id: 27,
                name: 'Plough',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQEy-lgBxmsbEG3k2ZHreKvsZTH5duhrOlLJ6JLec6OW-k-taXR6D1NdgQottcaUtD04IuLogVFT6TNgZjm45j5Pa6S7mmMasbexYc9IwdGvvIhBSsVHHsR8w&usqp=CAE',
                price: 12000, // ₹ per unit
              },
              {
                id: 28,
                name: 'Water Pump',
                imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTROSCf5C-7Hqr1KdNPHlG-P8EsBW09UJ81tuN_FwEt0WD-Nq5r5hU1zc4EOPm3E4KllU1ePYDmV99NTtqjTpzQvUNkeNGs3BSnO2uRNrA6Xjdv0JXm3oEM_g&usqp=CAE',
                price: 10000, // ₹ per unit
              },
            ],
          },
          {
            title: 'Pesticides',
            items: [
              {
                id: 29,
                name: 'Glyphosate',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQjvyz0placRNiCTHNdw54hn_rEcP3xOFQaKjSeDzX8WTcJf5w0XaVvlDu97uAfY3wGwMielE93Io2YNWgeo0RvkwIjWtFISaNWUDw8o_av1btYnn2g9gJx&usqp=CAE',
                price: 600, // ₹ per litre
              },
              {
                id: 30,
                name: 'Neem Oil',
                imageUrl: 'https://organicbazar.net/cdn/shop/products/Neem-Oil-for-Pests-Contro.jpg?v=1694167803&width=990',
                price: 350, // ₹ per litre
              },
              {
                id: 31,
                name: 'Chlorpyrifos',
                imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS3raIFMK2hW5efE5wFkiSZppukHfn_663qoB-8se8sE6JM-W_aTHgm2gO8hMMuaXDRIqQ3TY5Dup8IrW0VAIYG0-0KYid1EMz5wSqjGleGskzVlRD_9dVN&usqp=CAE',
                price: 800, // ₹ per litre
              },
              {
                id: 32,
                name: 'Imidacloprid',
                imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSQZmuuMaEs4toqZf3ri7hIWu03bzv8TjDINkCLXM3FA8_wAmrULAYGfmKI4IBphJDZjHMqaBjjnEpav_wuP7zGwrw6vIWI6ZbydAXlA5rh10IMMqrDPbRr&usqp=CAE',
                price: 500, // ₹ per litre
              },
            ],
          },
          {
            title: 'Irrigation Equipment',
            items: [
              {
                id: 33,
                name: 'Drip Irrigation Kit',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSgKS13DVu4iPtM3l0oqRZNt2YgLfOUvDvle_uUm53ZME8KUmnlXeE83qCfaiFpccFWIWRdXKmVK4vUdbv4_qVMkJOaIqEHqMHTQiejdpOyCPpjFrqiey4L&usqp=CAE',
                price: 8000, // ₹ per set
              },
              {
                id: 34,
                name: 'Sprinkler System',
                imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS4wEpxyLJ3uyCFnW7jQBsbPR1CBe1xEkMFWe6m2E5xme1TBuwEb6_Dr69TLIKyf2Lhxy8Us_ybwZYtqOJwj6AdwXfurN7mYW7f_LWq55E&usqp=CAE',
                price: 12000, // ₹ per set
              },
            ],
          },
        ];
        await Product.insertMany(farmerProducts);
        console.log("Products added");
        mongoose.connection.close();
    }
    catch(err){
        console.log(err);
    }
};

seedProducts();