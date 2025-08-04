// Chinese Character Flashcard App for Bangle.js 2
// Using E.showMessage with character in title for large display
// Character data with proper tone marks
var characters = [
  { char: '佳', pinyin: 'jiā', meaning: 'good, beautiful' },
  { char: '快', pinyin: 'kuài', meaning: 'fast, happy' },
  { char: '妄', pinyin: 'wàng', meaning: 'absurd, rash' },
  { char: '汽', pinyin: 'qì', meaning: 'steam, gas' },
  { char: '两', pinyin: 'liǎng', meaning: 'two, both' },
  { char: '体', pinyin: 'tǐ', meaning: 'body, form' },
  { char: '朋', pinyin: 'péng', meaning: 'friend' },
  { char: '助', pinyin: 'zhù', meaning: 'help, assist' },
  { char: '林', pinyin: 'lín', meaning: 'forest' },
  { char: '鱼', pinyin: 'yú', meaning: 'fish' },
  { char: '李', pinyin: 'lǐ', meaning: 'plum' },
  { char: '卫', pinyin: 'wèi', meaning: 'guard, defend' },
  { char: '块', pinyin: 'kuài', meaning: 'piece, chunk' },
  { char: '乞', pinyin: 'qǐ', meaning: 'beg, request' },
  { char: '中', pinyin: 'zhōng', meaning: 'middle, China' },
  { char: '国', pinyin: 'guó', meaning: 'country' },
  { char: '人', pinyin: 'rén', meaning: 'person' },
  { char: '大', pinyin: 'dà', meaning: 'big, large' },
  { char: '小', pinyin: 'xiǎo', meaning: 'small' },
  { char: '水', pinyin: 'shuǐ', meaning: 'water' },
  { char: '虫', pinyin: 'chóng', meaning: 'insect, bug' },
  { char: '蛇', pinyin: 'shé', meaning: 'snake' },
  { char: '蚂', pinyin: 'mǎ', meaning: 'ant (in 蚂蚁)' },
  { char: '蜜', pinyin: 'mì', meaning: 'honey' },
  { char: '蝴', pinyin: 'hú', meaning: 'butterfly (in 蝴蝶)' },
  { char: '蜂', pinyin: 'fēng', meaning: 'bee' },
  { char: '蚊', pinyin: 'wén', meaning: 'mosquito' },
  { char: '螃', pinyin: 'páng', meaning: 'crab (in 螃蟹)' },
  { char: '木', pinyin: 'mù', meaning: 'wood, tree' },
  { char: '火', pinyin: 'huǒ', meaning: 'fire' },
  { char: '土', pinyin: 'tǔ', meaning: 'earth, soil' },
  { char: '金', pinyin: 'jīn', meaning: 'gold, metal' },
  { char: '日', pinyin: 'rì', meaning: 'sun, day' },
  { char: '月', pinyin: 'yuè', meaning: 'moon, month' },
  { char: '山', pinyin: 'shān', meaning: 'mountain' },
  { char: '石', pinyin: 'shí', meaning: 'stone, rock' },
  { char: '田', pinyin: 'tián', meaning: 'field, farm' },
  { char: '白', pinyin: 'bái', meaning: 'white' },
  { char: '黑', pinyin: 'hēi', meaning: 'black' },
  { char: '红', pinyin: 'hóng', meaning: 'red' },
  { char: '绿', pinyin: 'lǜ', meaning: 'green' },
  { char: '黄', pinyin: 'huáng', meaning: 'yellow' },
  { char: '蓝', pinyin: 'lán', meaning: 'blue' },
  { char: '手', pinyin: 'shǒu', meaning: 'hand' },
  { char: '足', pinyin: 'zú', meaning: 'foot' },
  { char: '目', pinyin: 'mù', meaning: 'eye' },
  { char: '口', pinyin: 'kǒu', meaning: 'mouth' },
  { char: '耳', pinyin: 'ěr', meaning: 'ear' },
  { char: '心', pinyin: 'xīn', meaning: 'heart, mind' },
  { char: '头', pinyin: 'tóu', meaning: 'head' },
  { char: '门', pinyin: 'mén', meaning: 'door, gate' },
  { char: '窗', pinyin: 'chuāng', meaning: 'window' },
  { char: '房', pinyin: 'fáng', meaning: 'room, house' },
  { char: '家', pinyin: 'jiā', meaning: 'home, family' },
  { char: '车', pinyin: 'chē', meaning: 'car, vehicle' },
  { char: '马', pinyin: 'mǎ', meaning: 'horse' },
  { char: '牛', pinyin: 'niú', meaning: 'cow, ox' },
  { char: '羊', pinyin: 'yáng', meaning: 'sheep, goat' },
  { char: '猪', pinyin: 'zhū', meaning: 'pig' },
  { char: '狗', pinyin: 'gǒu', meaning: 'dog' },
  { char: '猫', pinyin: 'māo', meaning: 'cat' },
  { char: '鸟', pinyin: 'niǎo', meaning: 'bird' },
  { char: '花', pinyin: 'huā', meaning: 'flower' },
  { char: '草', pinyin: 'cǎo', meaning: 'grass' },
  { char: '树', pinyin: 'shù', meaning: 'tree' },
  { char: '叶', pinyin: 'yè', meaning: 'leaf' },
  { char: '米', pinyin: 'mǐ', meaning: 'rice' },
  { char: '面', pinyin: 'miàn', meaning: 'noodles, face' },
  { char: '茶', pinyin: 'chá', meaning: 'tea' },
  { char: '酒', pinyin: 'jiǔ', meaning: 'wine, alcohol' },
  { char: '肉', pinyin: 'ròu', meaning: 'meat' },
  { char: '菜', pinyin: 'cài', meaning: 'vegetable, dish' },
  { char: '果', pinyin: 'guǒ', meaning: 'fruit, result' },
  { char: '蛋', pinyin: 'dàn', meaning: 'egg' },
  { char: '奶', pinyin: 'nǎi', meaning: 'milk' },
  { char: '糖', pinyin: 'táng', meaning: 'sugar, candy' },
  { char: '盐', pinyin: 'yán', meaning: 'salt' },
  { char: '油', pinyin: 'yóu', meaning: 'oil' },
  { char: '刀', pinyin: 'dāo', meaning: 'knife' },
  { char: '笔', pinyin: 'bǐ', meaning: 'pen, brush' },
  { char: '纸', pinyin: 'zhǐ', meaning: 'paper' },
  { char: '书', pinyin: 'shū', meaning: 'book' },
  { char: '字', pinyin: 'zì', meaning: 'character, word' },
  { char: '学', pinyin: 'xué', meaning: 'study, learn' },
  { char: '工', pinyin: 'gōng', meaning: 'work, labor' },
  { char: '作', pinyin: 'zuò', meaning: 'make, do' },
  { char: '用', pinyin: 'yòng', meaning: 'use' },
  { char: '买', pinyin: 'mǎi', meaning: 'buy' },
  { char: '卖', pinyin: 'mài', meaning: 'sell' },
  { char: '钱', pinyin: 'qián', meaning: 'money' },
  { char: '店', pinyin: 'diàn', meaning: 'shop, store' },
  { char: '市', pinyin: 'shì', meaning: 'city, market' },
  { char: '路', pinyin: 'lù', meaning: 'road, path' },
  { char: '桥', pinyin: 'qiáo', meaning: 'bridge' },
  { char: '船', pinyin: 'chuán', meaning: 'boat, ship' },
  { char: '飞', pinyin: 'fēi', meaning: 'fly' },
  { char: '走', pinyin: 'zǒu', meaning: 'walk, go' },
  { char: '跑', pinyin: 'pǎo', meaning: 'run' },
  { char: '站', pinyin: 'zhàn', meaning: 'stand, station' },
  { char: '坐', pinyin: 'zuò', meaning: 'sit' },
  { char: '睡', pinyin: 'shuì', meaning: 'sleep' },
  { char: '吃', pinyin: 'chī', meaning: 'eat' },
  { char: '喝', pinyin: 'hē', meaning: 'drink' },
  { char: '说', pinyin: 'shuō', meaning: 'speak, say' },
  { char: '女', pinyin: 'nǚ', meaning: 'woman, female' },
  { char: '子', pinyin: 'zǐ', meaning: 'child, son' },
  { char: '王', pinyin: 'wáng', meaning: 'king' },
  { char: '玉', pinyin: 'yù', meaning: 'jade' },
  { char: '竹', pinyin: 'zhú', meaning: 'bamboo' },
  { char: '丝', pinyin: 'sī', meaning: 'silk, thread' },
  { char: '禾', pinyin: 'hé', meaning: 'grain, rice plant' },
  { char: '犬', pinyin: 'quǎn', meaning: 'dog' },
  { char: '牙', pinyin: 'yá', meaning: 'tooth, fang' },
  { char: '贝', pinyin: 'bèi', meaning: 'shell, money' },
  { char: '见', pinyin: 'jiàn', meaning: 'see, meet' },
  { char: '页', pinyin: 'yè', meaning: 'page, leaf' },
  { char: '风', pinyin: 'fēng', meaning: 'wind' },
  { char: '雨', pinyin: 'yǔ', meaning: 'rain' },
  { char: '云', pinyin: 'yún', meaning: 'cloud' },
  { char: '电', pinyin: 'diàn', meaning: 'electricity' },
  { char: '气', pinyin: 'qì', meaning: 'air, breath' },
  { char: '冰', pinyin: 'bīng', meaning: 'ice' },
  { char: '雪', pinyin: 'xuě', meaning: 'snow' },
  { char: '力', pinyin: 'lì', meaning: 'strength, power' },
  { char: '刂', pinyin: 'dāo', meaning: 'knife radical' },
  { char: '又', pinyin: 'yòu', meaning: 'again, right hand' },
  { char: '寸', pinyin: 'cùn', meaning: 'inch, small' },
  { char: '弓', pinyin: 'gōng', meaning: 'bow, arch' },
  { char: '彡', pinyin: 'shān', meaning: 'hair, decoration' },
  { char: '夕', pinyin: 'xī', meaning: 'evening, sunset' },
  { char: '广', pinyin: 'guǎng', meaning: 'broad, wide' },
  { char: '厂', pinyin: 'chǎng', meaning: 'factory, cliff' },
  { char: '斤', pinyin: 'jīn', meaning: 'catty, weight' },
  { char: '方', pinyin: 'fāng', meaning: 'square, direction' },
  { char: '户', pinyin: 'hù', meaning: 'door, household' },
  { char: '尸', pinyin: 'shī', meaning: 'corpse, body' },
  { char: '弋', pinyin: 'yì', meaning: 'shoot, hunt' },
  { char: '戈', pinyin: 'gē', meaning: 'spear, weapon' },
  { char: '斗', pinyin: 'dǒu', meaning: 'fight, measure' },
  { char: '欠', pinyin: 'qiàn', meaning: 'owe, lack' },
  { char: '止', pinyin: 'zhǐ', meaning: 'stop, foot' },
  { char: '歹', pinyin: 'dǎi', meaning: 'bad, evil' },
  { char: '殳', pinyin: 'shū', meaning: 'weapon, rod' },
  { char: '毛', pinyin: 'máo', meaning: 'hair, fur' },
  { char: '氏', pinyin: 'shì', meaning: 'clan, family name' },
  { char: '片', pinyin: 'piàn', meaning: 'slice, piece' },
  { char: '牜', pinyin: 'niú', meaning: 'cow radical' },
  { char: '礻', pinyin: 'shì', meaning: 'spirit radical' },
  { char: '衤', pinyin: 'yī', meaning: 'clothing radical' },
  { char: '讠', pinyin: 'yán', meaning: 'speech radical' },
  { char: '钅', pinyin: 'jīn', meaning: 'metal radical' },
  { char: '饣', pinyin: 'shí', meaning: 'food radical' },
  { char: '纟', pinyin: 'sī', meaning: 'silk radical' },
  { char: '艹', pinyin: 'cǎo', meaning: 'grass radical' }
];

// App state
var currentIndex = 0;
var showingAnswer = false;
var shuffled = false;
var studyOrder = [];

// Initialize study order
for (var i = 0; i < characters.length; i++) {
  studyOrder.push(i);
}

// Set up touch handler
function setupTouch() {
  Bangle.on('touch', function(button, xy) {
    if (!xy) return;
    
    var y = xy.y;
    
    // Divide screen into regions
    if (y < 58) {
      // Top third - Previous card
      previousCard();
    } else if (y < 118) {
      // Middle third - Flip card
      flipCard();
    } else {
      // Bottom third - Next card
      nextCard();
    }
  });
}

// Set up button for exit
function setupButton() {
  setWatch(function() {
    load();
  }, BTN1, {repeat:false, edge:"falling"});
}

// Show current flashcard
function showCard() {
  var char = characters[studyOrder[currentIndex]];
  var progress = (currentIndex + 1) + "/" + characters.length;
  //var shuffleIndicator = shuffled ? " 🔀" : "";
  
  if (!showingAnswer) {
    // Question side - character in title, simple prompt in body
    var title = char.char + " " + progress;
    var questionText = "\nTap to reveal\npinyin & meaning";
    
    E.showMessage(questionText, title);
  } else {
    // Answer side - character in title, details in body
    var title = char.char + " " + progress;
    var answerText = char.pinyin + "\n" + 
                     char.meaning + "\n";
    
    E.showMessage(answerText, title);
  }
}

// Flip card (show/hide answer)
function flipCard() {
  showingAnswer = !showingAnswer;
  showCard();
}

// Go to next card
function nextCard() {
  showingAnswer = false;
  currentIndex = (currentIndex + 1) % characters.length;
  showCard();
}

// Go to previous card
function previousCard() {
  showingAnswer = false;
  currentIndex = currentIndex === 0 ? characters.length - 1 : currentIndex - 1;
  showCard();
}

// Shuffle the cards
function shuffleCards() {
  // Fisher-Yates shuffle
  for (var i = studyOrder.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = studyOrder[i];
    studyOrder[i] = studyOrder[j];
    studyOrder[j] = temp;
  }
  shuffled = true;
  currentIndex = 0;
  showingAnswer = false;
  showCard();
}

// Initialize the app
function init() {
  setupTouch();
  setupButton();
  
  // Show welcome and start
  E.showMessage("Chinese\nFlashcards\n\n" + characters.length + " characters\n\nTap to start!", "Welcome");
  
  // Auto-start after 2 seconds or wait for touch
  setTimeout(function() {
    showCard();
  }, 2000);
}

// Start the app
init();
