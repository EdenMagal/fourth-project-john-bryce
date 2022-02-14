create database project4;

use project4;

create table users(
    firstName varchar(255),
    lastName varchar(255),
    username varchar(255),
    idNumber int,
    password varchar(255),
    city varchar(255),
    street varchar(255),
    role varchar(255) default "user",
    primary key(idNumber)
);

create table categories(
    name varchar(255),
    categoryId int auto_increment,
    primary key(categoryId)
);

create table products(
    productId int auto_increment,
    name varchar(255),
    price int,
    imgUrl text,
    categoryId int,
    foreign key(categoryId) references categories(categoryId),
    primary key(productId)
);

create table carts(
    cartId int auto_increment,
    customerId int,
    creationDate date default now(),
    isOpen boolean default true,
    primary key(cartId),
    foreign key(customerId) references users(idNumber)
);

create table cartItem(
    itemId int auto_increment,
    productId int,
    amount int,
    totalPrice int,
    cartId int,
    primary key(itemId),
    foreign key(productId) references products(productId),
    foreign key(cartId) references carts(cartId)
);

create table orders(
    orderId int auto_increment,
    customerId int,
    cartId int,
    price int,
    city varchar(255),
    street varchar(255),
    shippingDate date,
    orderDate date default now(),
    cardInfo int,
    primary key(orderId),
    foreign key(customerId) references users(idNumber),
    foreign key(cartId) references carts(cartId)
);

insert into
    categories(name)
values
    ("Shirts"),
    ("Hoodies"),
    ("Posters"),
    ("Jewellery"),
    ("Items"),
    ("Pops"),
    ("Hats"),
    ("Cups"),
    ("Shoes");

insert into
    products(name, price, imgUrl, categoryId)
values
    (
        "Avengers T-shirt",
        10,
        "https://www.ubuy.vn/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvQTEzdXNhb251dEwuX0NMYSU3QzIxNDAlMkMyMDAwJTdDQTE2NDI5TmR0ekwucG5nJTdDMCUyQzAlMkMyMTQwJTJDMjAwMCUyQjAuMCUyQzAuMCUyQzIxNDAuMCUyQzIwMDAuMF9BQ19VTDE1MDBfLnBuZw.jpg",
        1
    ),
    (
        "Marvel T-shirt",
        6,
        "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C71cexkBJtlL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UL1500_.png",
        1
    ),
    (
        "Scarlet witch T-shirt",
        8,
        "https://media.kohlsimg.com/is/image/kohls/3852857?wid=512&hei=512&op_sharpen=1&fmt=jpeg&qlt=85,1&op_sharpen=0&resMode=sharp2&op_usm=1,0.8,6,0",
        1
    ),
    (
        "Wolverine T-shirt",
        8,
        "https://www.logoshirt-shop.de/out/pictures/generated/product/1/390_245_100/easy-fit-t-shirt-wolverine-marvel-comics-tee-logoshirt-a.jpg",
        1
    ),
    (
        "More than a T-shirt",
        10,
        "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91BX-FXzFDL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UX342_.png",
        1
    ),
    (
        "Spider-man T-shirt",
        7,
        "https://www.redwolf.in/image/cache/catalog/mens-t-shirts/full-sleeves/spider-man-logo-full-sleeves-t-shirt-india-2-438x438.jpg",
        1
    ),
    (
        "Venom T-shirt",
        7,
        "https://images.fun.com/products/72620/1-21/marvel-venom-face-adult-t-shirt-for-men-update.jpg",
        1
    ),
    (
        "I am T-shirt",
        8,
        "https://i5.walmartimages.com/asr/4de8e97e-cc39-45ac-a655-9dba284a3753.ce0078b271ca4b0de4b70d9e7187b67f.jpeg?odnHeight=580&odnWidth=580&odnBg=FFFFFF",
        1
    ),
    (
        "Iron man T-shirt",
        9,
        "https://hurtee.com/wp-content/uploads/2019/04/Iron-Man-T-shirt.jpg",
        1
    ),
    (
        "Get help T-shirt",
        10,
        "https://ae05.alicdn.com/kf/H5d26474f1520443fb386cf3f257ea21am/Avenger-Endgame-T-Shirt-Thor-and-Loki-Get-Help-Game-Cute-Men-s-White-Stranger-Things.jpg",
        1
    ),
    (
        "I am a really good lawyer T-shirt",
        9,
        "https://mockupgenerator.ap-south-1.linodeobjects.com/Mockups/Proteeus/4d99faba-24a6-4ad3-bfbb-2a6421eb70a0-5000-front-white.jpg",
        1
    );

insert into
    products(name, price, imgUrl, categoryId)
values
    (
        "Assemble hoodie",
        12,
        "https://i.etsystatic.com/6567996/c/2506/1991/0/117/il/959958/3345775082/il_340x270.3345775082_4o9x.jpg",
        2
    ),
    (
        "Spiderman hoodie",
        14,
        "https://i0.wp.com/ae01.alicdn.com/kf/Hafc249a9691f443885b38bb6c0187cadd.jpg?w=980",
        2
    ),
    (
        "World's best chiropractor hoodie",
        15,
        "https://trendsbedding.s3.us-west-1.amazonaws.com/2021/12/andrew-garfield-worlds-best-chiropractor-sweatshirt_1640516715-scaled.jpg",
        2
    ),
    (
        "Captain America hoodie",
        12,
        "https://i.pinimg.com/originals/ff/8f/1d/ff8f1dacfa131eb5c4955f13c16c1233.png",
        2
    ),
    (
        "Falcon hoodie",
        10,
        "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_3963000/altimages/ff_3963451-389613d1fbf116dba219alt1_full.jpg&w=900",
        2
    ),
    (
        "A worthy hoodie",
        12,
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1640582958_8779651.jpg",
        2
    ),
    (
        "We were on Avengers hoodie",
        15,
        "https://i.pinimg.com/736x/37/b9/29/37b9298cd7a32419dde5157d0f0551c4.jpg",
        2
    ),
    (
        "Excelsior hoodie",
        12,
        "https://i.pinimg.com/474x/2e/31/13/2e3113b05e6e384f5df91d484555fbf7.jpg",
        2
    ),
    (
        "Oh snap hoodie",
        10,
        "https://m.media-amazon.com/images/I/B1r1AbikBQS._CLa%7C2140%2C2000%7CA10F7jj39JL.png%7C0%2C0%2C2140%2C2000%2B659.0%2C492.0%2C777.0%2C701.0_AC_UL1500_.png",
        2
    ),
    (
        "In Loki we trust hoodie",
        14,
        "https://canary.contestimg.wish.com/api/webimage/5d0067b98baaa11151385da8-large.jpg?cache_buster=026b4ed436071e5ca63226bb85e4be8b",
        2
    ),
    (
        "Hulk smash hoodie",
        12,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpQ8ctNzmhOZICCWg_oRCzwUq1uyZF06FFg&usqp=CAU",
        2
    );

insert into
    products(name, price, imgUrl, categoryId)
values
    (
        "Antman and the Wasp poster",
        5,
        "https://wallpapercave.com/wp/wp2615440.jpg",
        3
    ),
    (
        "Avengers EndGame poster",
        7,
        "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0%2C0%2C540%2C810",
        3
    ),
    (
        "Captain America - The winter soldier poster",
        5,
        "https://alternativemovieposters.com/wp-content/uploads/2019/07/dakota_wintersoldier.jpg",
        3
    ),
    (
        "Spiderman no way home poster",
        7,
        "https://pro2-bar-s3-cdn-cf2.myportfolio.com/f44a6a86-6cdb-4ac5-b205-003353cc5a9c/d3a1c569-37b1-4a53-b605-bba1e1f6178a_rw_1920.jpg?h=02d267c3bf75772858c88582ad4d4b7c",
        3
    ),
    (
        "Guardians of the galaxy vol 2 poster",
        5,
        "https://m.media-amazon.com/images/I/61Aya3ZptDL._AC_.jpg",
        3
    ),
    (
        "Shang-chi poster",
        5,
        "https://m.media-amazon.com/images/M/MV5BNTliYjlkNDQtMjFlNS00NjgzLWFmMWEtYmM2Mzc2Zjg3ZjEyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        3
    ),
    (
        "Black Phanter poster",
        5,
        "https://cdn.shopify.com/s/files/1/2103/4063/products/BlackPanther_poster_06b76e17-9825-4789-8859-7d1dccf53b4a_1024x1024.jpg?v=1519668121",
        3
    ),
    (
        "Doctor Strange poster",
        5,
        "https://m.media-amazon.com/images/I/71gyLVWIfIL._AC_SL1032_.jpg",
        3
    ),
    (
        "What if? poster",
        5,
        "https://m.media-amazon.com/images/I/71tB2uriLZS._AC_SL1500_.jpg",
        3
    ),
    (
        "WandaVision poster",
        5,
        "https://cdn.europosters.eu/image/750/posters/wandavision-reality-rift-i106807.jpg",
        3
    ),
    (
        "Hawkeye poster",
        5,
        "https://www.brickfanatics.com/wp-content/uploads/Hawkeye-poster.jpg",
        3
    ),
    (
        "Black widow poster",
        5,
        "https://m.media-amazon.com/images/M/MV5BNjRmNDI5MjMtMmFhZi00YzcwLWI4ZGItMGI2MjI0N2Q3YmIwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
        3
    ),
    (
        "Infinity war poster",
        7,
        "https://cdn.europosters.eu/image/750/posters/avengers-infinity-war-one-sheet-i58560.jpg",
        3
    ),
    (
        "Deadpool poster",
        5,
        "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        3
    ),
    (
        "Spiderman into the spider verse poster",
        5,
        "https://www.ubuy.co.it/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvODFpOHJ1OWtFYUwuX0FDX1NMMTUwMF8uanBn.jpg",
        3
    );

insert into
    products(name, price, imgUrl, categoryId)
values
    (
        "Tesseract necklace",
        18,
        "https://marvelgoodies.com/wp-content/uploads/2019/07/0_Avengers-Infinity-War-Tube-Necklace-Infinity-Blue-Stone-Pendant-Loki-Unlimited-Power-Avengers-Jewelry-for-Women.jpg",
        4
    ),
    (
        "Get help keychain",
        15,
        "https://images-na.ssl-images-amazon.com/images/I/61c38Otk6JL._UL1500_.jpg",
        4
    ),
    (
        "I'm with you 'till the end of the line matching necklaces",
        18,
        "https://m.media-amazon.com/images/I/41Fs6gBIjqL._SL500_.jpg",
        4
    ),
    (
        "Proof that Tony Stark has a heart necklace",
        12,
        "https://ae01.alicdn.com/kf/HTB1dVf.UmzqK1RjSZFHq6z3CpXaU/Iron-Man-Tony-Stark-Arc-Reactor-Necklace-3D-Effects-Glass-Dome-Pendant-The-Avengers-4-Endgame.jpg",
        4
    ),
    (
        "Mjollnir necklace",
        15,
        "https://i.pinimg.com/736x/55/58/ac/5558ac0b41ee0e6d10505979cd9e71a0.jpg",
        4
    ),
    (
        "Star Lord's mix tape necklace & earring matching set",
        20,
        "https://i5.walmartimages.com/asr/7267c02b-fab3-40a2-a9ca-269e006c01d7.8a799b520a144684fe2e50404cff8fdd.jpeg",
        4
    ),
    (
        "Black Phanter's necklace",
        14,
        "https://www.derivefigurine.com/9122-medium_default/pre-order-marvel-jewelry-black-panther-necklace.jpg",
        4
    ),
    (
        "Captain Marvel necklace",
        10,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6nhusLfXdPzqwq1JYLQ4fHh3KnrjE9VHUwg&usqp=CAU",
        4
    ),
    (
        "Loki's ring",
        10,
        "https://i.pinimg.com/736x/7e/70/8a/7e708a86adf2e7ef2ebe505755f8f270.jpg",
        4
    ),
    (
        "Avengers' bracelet",
        15,
        "https://images1.pricecheck.co.za/images/objects/hash/product/2bf/78b/981/image_big_106684628.jpg?1511339736",
        4
    ),
    (
        "Deadpool earrings",
        16,
        "https://cdn.archonia.com/images/1-53540803-1-1-original1/marvel-jewelry-deadpool-logo-dangle-earrings.jpg",
        4
    ),
    (
        "Avengers' tattoo symbol necklace",
        12,
        "data:image/jpeg;base64,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",
        4
    );

insert into
    products(name, price, imgUrl, categoryId)
values
    (
        "Captain America's shield",
        50,
        "https://www.emk.com/product/image/medium/ikfid11940_4.png",
        5
    ),
    (
        "Mijollnir (AKA Jhonathan)",
        45,
        "https://m.media-amazon.com/images/I/81fKIh7xi9L._SL1500_.jpg",
        5
    ),
    (
        "Loki's dagger",
        55,
        "data:image/jpeg;base64,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",
        5
    ),
    (
        "Infinity gauntlet",
        60,
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/infinity-gauntlet-nikita-abakumov.jpg",
        5
    ),
    (
        "Bucky's metal arm",
        45,
        "https://www.cosplayinspire.com/pub/media/catalog/product/cache/dd9b268b29f92e71b2b8e02fe4de042c/a/v/avengers-infinity-war-bucky-barnes-white-wolf-vibranium-arm-cosplay-buy.jpg",
        5
    ),
    (
        "Yondu's arrow",
        35,
        "https://i.etsystatic.com/11136888/r/il/25d3ad/1863438743/il_570xN.1863438743_inp7.jpg",
        5
    ),
    (
        "Hawkeye's crossbow",
        40,
        "https://m.media-amazon.com/images/I/515lfiy3ntL._AC_SX425_.jpg",
        5
    ),
    (
        "Scarlet witch's horns",
        20,
        "https://cdn11.bigcommerce.com/s-vlgoneie7l/images/stencil/1280x1280/products/188/1858/Scarlet-Witch-WandaVision-Headpiece-Front-web2__48075.1614494394.jpg?c=2",
        5
    ),
    (
        "Doctor Strange's cape",
        30,
        "https://i.etsystatic.com/19928520/c/1500/1192/0/57/il/9eacb8/3356522318/il_340x270.3356522318_mwhh.jpg",
        5
    ),
    (
        "Doc Oc's arms",
        150,
        "https://p.turbosquid.com/ts-thumb/Ku/xyzWl4/Xf/tnarmsdone/png/1640378836/600x600/fit_q87/9836c78acf88a46305e1458e190669805f2b6f3e/tnarmsdone.jpg",
        5
    ),
    (
        "Iron Man's helmet",
        200,
        "https://i.etsystatic.com/19286482/r/il/96c0fd/2980731281/il_fullxfull.2980731281_j8z4.jpg",
        5
    );

insert into
    products(name, price, imgUrl, categoryId)
values
    (
        "Scarlet witch pop",
        20,
        "https://www.techinn.com/f/13795/137954183/funko-pop-marvel-wandavision-wanda-halloween.jpg",
        6
    ),
    (
        "Iron Man pop",
        20,
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1621262158-12447067-1814753590012582.jpg",
        6
    ),
    (
        "Stan Lee pop",
        30,
        "https://cdn.onebauer.media/one/media/5daf/0e32/b6d9/6204/c600/c4bc/StanLee.jpg?format=jpg&quality=80&width=500&ratio=1-1&resize=aspectfit",
        6
    ),
    (
        "Falcon pop",
        20,
        "https://static.thcdn.com/images/xsmall/original//productimg/1600/1600/12698609-7634833982861944.jpg",
        6
    ),
    (
        "Captain Carter pop",
        20,
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1630414737-12738707-1114877474173749.jpg",
        6
    ),
    (
        "Caaptain America with Thor's hammer pop",
        20,
        "https://m.media-amazon.com/images/I/61hFXtxFi6L._AC_SX425_.jpg",
        6
    ),
    (
        "Cheerleader Deadpool pop",
        20,
        "https://i.pinimg.com/736x/96/34/c6/9634c6b60ea2ad8619650c61360a9140.jpg",
        6
    ),
    (
        "Iron Hulk pop",
        20,
        "https://cdn.onebauer.media/one/media/5d41/af77/171a/b46f/9aa1/d6b0/HUlk.jpg?format=jpg&quality=80&width=500&ratio=1-1&resize=aspectfit",
        6
    ),
    (
        "Yelena pop",
        20,
        "https://bbts1.azureedge.net/images/p/full/2020/04/b5f0552e-4a84-4380-a654-182808a9db77.jpg",
        6
    ),
    (
        "Groot pop",
        20,
        "http://marveltoynews.com/wp-content/uploads/2017/05/Amazon-Exclusive-Teenage-Groot-POP-Vinyl-Variant-Swept-Hair.jpg",
        6
    );

insert into
    products(name, price, imgUrl, categoryId)
values
    (
        "Marvel hat",
        15,
        "https://m.media-amazon.com/images/I/615y1FlZmLL._AC_UL1002_.jpg",
        7
    ),
    (
        "Shield hat",
        15,
        "https://cdn.shopify.com/s/files/1/1405/7728/products/shield_snapback.jpg?v=1617733515",
        7
    ),
    (
        "Deadpool hat",
        15,
        "https://ae01.alicdn.com/kf/HTB18rUIn26H8KJjSspmq6z2WXXah/Fashion-Summer-Deadpool-Embroidery-Baseball-Caps-Funny-Marvel-Hat-Adjustable-Snapback-Casquette-Hockey-Caps-Comfortable-Sun.jpg_Q90.jpg_.webp",
        7
    ),
    (
        "Avengers hat",
        20,
        "https://www.uptownkids.com.au/wp-content/uploads/2021/01/avengers-hat.jpg",
        7
    ),
    (
        "Vemon hat",
        15,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWxIWequI9eM7XrhdmEwPH7OMfowNfYGGxeQ&usqp=CAU",
        7
    ),
    (
        "Avengers hat",
        15,
        "https://bbts1.azureedge.net/images/p/full/2021/06/1b408efb-880f-4acc-b67c-4b5d286f4ed4.jpg",
        7
    ),
    (
        "What if? hat",
        15,
        "https://caphunters.com/27571-large_default/difuzed-flat-brim-what-if-marvel-comics-black-and-red-snapback-cap.jpg",
        7
    ),
    (
        "Civil war hat",
        15,
        "https://www.tophats-shop.com/41354-catalog_large/civil-war-marvel-avengers-iron-man-and-captain-america-new-era-cap.jpg",
        7
    ),
    (
        "Mickie Spiderman hat",
        25,
        "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/7514057370954",
        7
    ),
    (
        "Aligator Loki hat",
        15,
        "https://m.media-amazon.com/images/I/61qi+PULLpS._AC_UL1050_.jpg",
        7
    );

insert into
    products(name, price, imgUrl, categoryId)
values
    (
        "Avengers 6 cups set",
        60,
        "https://cf.shopee.ph/file/4771c23110b898b2d91e321c4f4cd3ed",
        8
    ),
    (
        "Groot cup",
        20,
        "https://cdn.myshoptet.com/usr/www.gamlery.com/user/shop/big/5369_2330-marvel-mug-i-am-groot.jpg?5d307d64",
        8
    ),
    (
        "Infinity glove cup",
        25,
        "https://www.menkind.co.uk/media/catalog/product/cache/84a9762dea65cd4d66747ad9a34bdb64/7/2/72185_avengers_infinity_war_gauntlet_mug.jpg",
        8
    ),
    (
        "Spiderman cup",
        15,
        "https://i.ebayimg.com/images/g/oigAAOSw2B1d8kyl/s-l300.jpg",
        8
    ),
    (
        "I love you 3000 cup",
        25,
        "https://i.ebayimg.com/images/g/a04AAOSwPaFf-1gM/s-l300.png",
        8
    ),
    (
        "The spiderman meme cup",
        40,
        "https://i.etsystatic.com/23222348/r/il/bd3156/3574649005/il_300x300.3574649005_qhq9.jpg",
        8
    ),
    (
        "Avengers infinty war 2 cups set",
        40,
        "https://ae01.alicdn.com/kf/HTB1MlVQXDHuK1RkSndVq6xVwpXa8/The-Avengers-coffee-mugs-Color-Changing-Mugs-350ml-gift-ceramic-tea-cup-mug.jpg",
        8
    ),
    (
        "Thor cup",
        25,
        "http://cdn.shopify.com/s/files/1/1305/2183/products/Thor_Hammer_Mug14_1200x1200.jpg?v=1556886834",
        8
    ),
    (
        "Ant man cup",
        20,
        "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/7200000944ZES",
        8
    ),
    (
        "Daredevil cup",
        10,
        "https://i5.walmartimages.com/asr/40c4fd0d-df1e-4840-a4c5-06ebc4ffd54c.63b6715311e21edfb9863ec786a688f2.jpeg",
        8
    );

insert into
    products(name, price, imgUrl, categoryId)
values
    (
        "Venom shoes",
        200,
        "https://cf.shopee.com.my/file/96803e15938bda2b5944785fafb241e6",
        9
    ),
    (
        "Captain America shoes",
        250,
        "https://rukminim1.flixcart.com/image/714/857/j1fb98w0/shoe/d/k/z/1722516-8-kook-n-keech-marvel-navy-original-imaesz6dmhwqd5w8.jpeg?q=50",
        9
    ),
    (
        "Marvel 6 pairs of shoes set",
        1200,
        "https://cdn.sanity.io/images/c1chvb1i/production/7cf971d032de23b7f1f4cf8341f44b84c961c1d5-700x466.jpg/vans-marvel-avengers-collection-sneaker-freaker-1_180424_150947.jpg",
        9
    ),
    (
        "Time Heist Air Jordans",
        400,
        "https://i.pinimg.com/originals/a0/ea/22/a0ea224643ff26e1372f9bd84d9f1012.jpg",
        9
    ),
    (
        "Spiderman & Groot shoes",
        230,
        "https://i.etsystatic.com/33294775/r/il/443029/3534256056/il_340x270.3534256056_3s4a.jpg",
        9
    ),
    (
        "Thanos shoes",
        150,
        "https://i.pinimg.com/originals/1d/bf/0e/1dbf0e305bd740498a05dd6771bf2149.jpg",
        9
    );

insert into
    users(
        firstName,
        lastName,
        username,
        password,
        idNumber,
        city,
        street,
        role
    )
values
    (
        "admin",
        "admin",
        "admin@admin.admin",
        "admin",
        111111111,
        "",
        "",
        "admin"
    ),
    (
        "user",
        "user",
        "user@user.user",
        "user",
        22222222,
        "Ashdod",
        "user street",
        "user"
    );