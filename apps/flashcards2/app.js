// Chinese Character Flashcard App for Bangle.js 2
// Using manual drawing with g.drawString for better Unicode support
// Character data with proper tone marks
var characters = [
  { char: '佳', pinyin: 'jia1', meaning: 'good, beautiful' },
  { char: '快', pinyin: 'kuai4', meaning: 'fast, happy' },
  { char: '妄', pinyin: 'wang4', meaning: 'absurd, rash' },
  { char: '汽', pinyin: 'qi4', meaning: 'steam, gas' },
  { char: '两', pinyin: 'liang3', meaning: 'two, both' },
  { char: '体', pinyin: 'ti3', meaning: 'body, form' },
  { char: '朋', pinyin: 'peng2', meaning: 'friend' },
  { char: '助', pinyin: 'zhu4', meaning: 'help, assist' },
  { char: '林', pinyin: 'lin2', meaning: 'forest' },
  { char: '鱼', pinyin: 'yu2', meaning: 'fish' },
  { char: '李', pinyin: 'li3', meaning: 'plum' },
  { char: '卫', pinyin: 'wei4', meaning: 'guard, defend' },
  { char: '块', pinyin: 'kuai4', meaning: 'piece, chunk' },
  { char: '乞', pinyin: 'qi3', meaning: 'beg, request' },
  { char: '中', pinyin: 'zhong1', meaning: 'middle, China' },
  { char: '国', pinyin: 'guo2', meaning: 'country' },
  { char: '人', pinyin: 'ren2', meaning: 'person' },
  { char: '大', pinyin: 'da4', meaning: 'big, large' },
  { char: '小', pinyin: 'xiao3', meaning: 'small' },
  { char: '水', pinyin: 'shui3', meaning: 'water' },
  { char: '虫', pinyin: 'chong2', meaning: 'insect, bug' },
  { char: '蛇', pinyin: 'she2', meaning: 'snake' },
  { char: '蚂', pinyin: 'ma3', meaning: 'ant (in 蚂蚁)' },
  { char: '蜜', pinyin: 'mi4', meaning: 'honey' },
  { char: '蝴', pinyin: 'hu2', meaning: 'butterfly (in 蝴蝶)' },
  { char: '蜂', pinyin: 'feng1', meaning: 'bee' },
  { char: '蚊', pinyin: 'wen2', meaning: 'mosquito' },
  { char: '螃', pinyin: 'pang2', meaning: 'crab (in 螃蟹)' },
  { char: '木', pinyin: 'mu4', meaning: 'wood, tree' },
  { char: '火', pinyin: 'huo3', meaning: 'fire' },
  { char: '土', pinyin: 'tu3', meaning: 'earth, soil' },
  { char: '金', pinyin: 'jin1', meaning: 'gold, metal' },
  { char: '日', pinyin: 'ri4', meaning: 'sun, day' },
  { char: '月', pinyin: 'yue4', meaning: 'moon, month' },
  { char: '山', pinyin: 'shan1', meaning: 'mountain' },
  { char: '石', pinyin: 'shi2', meaning: 'stone, rock' },
  { char: '田', pinyin: 'tian2', meaning: 'field, farm' },
  { char: '白', pinyin: 'bai2', meaning: 'white' },
  { char: '黑', pinyin: 'hei1', meaning: 'black' },
  { char: '红', pinyin: 'hong2', meaning: 'red' },
  { char: '绿', pinyin: 'lv4', meaning: 'green' },
  { char: '黄', pinyin: 'huang2', meaning: 'yellow' },
  { char: '蓝', pinyin: 'lan2', meaning: 'blue' },
  { char: '手', pinyin: 'shou3', meaning: 'hand' },
  { char: '足', pinyin: 'zu2', meaning: 'foot' },
  { char: '目', pinyin: 'mu4', meaning: 'eye' },
  { char: '口', pinyin: 'kou3', meaning: 'mouth' },
  { char: '耳', pinyin: 'er3', meaning: 'ear' },
  { char: '心', pinyin: 'xin1', meaning: 'heart, mind' },
  { char: '头', pinyin: 'tou2', meaning: 'head' },
  { char: '门', pinyin: 'men2', meaning: 'door, gate' },
  { char: '窗', pinyin: 'chuang1', meaning: 'window' },
  { char: '房', pinyin: 'fang2', meaning: 'room, house' },
  { char: '家', pinyin: 'jia1', meaning: 'home, family' },
  { char: '车', pinyin: 'che1', meaning: 'car, vehicle' },
  { char: '马', pinyin: 'ma3', meaning: 'horse' },
  { char: '牛', pinyin: 'niu2', meaning: 'cow, ox' },
  { char: '羊', pinyin: 'yang2', meaning: 'sheep, goat' },
  { char: '猪', pinyin: 'zhu1', meaning: 'pig' },
  { char: '狗', pinyin: 'gou3', meaning: 'dog' },
  { char: '猫', pinyin: 'mao1', meaning: 'cat' },
  { char: '鸟', pinyin: 'niao3', meaning: 'bird' },
  { char: '花', pinyin: 'hua1', meaning: 'flower' },
  { char: '草', pinyin: 'cao3', meaning: 'grass' },
  { char: '树', pinyin: 'shu4', meaning: 'tree' },
  { char: '叶', pinyin: 'ye4', meaning: 'leaf' },
  { char: '米', pinyin: 'mi3', meaning: 'rice' },
  { char: '面', pinyin: 'mian4', meaning: 'noodles, face' },
  { char: '茶', pinyin: 'cha2', meaning: 'tea' },
  { char: '酒', pinyin: 'jiu3', meaning: 'wine, alcohol' },
  { char: '肉', pinyin: 'rou4', meaning: 'meat' },
  { char: '菜', pinyin: 'cai4', meaning: 'vegetable, dish' },
  { char: '果', pinyin: 'guo3', meaning: 'fruit, result' },
  { char: '蛋', pinyin: 'dan4', meaning: 'egg' },
  { char: '奶', pinyin: 'nai3', meaning: 'milk' },
  { char: '糖', pinyin: 'tang2', meaning: 'sugar, candy' },
  { char: '盐', pinyin: 'yan2', meaning: 'salt' },
  { char: '油', pinyin: 'you2', meaning: 'oil' },
  { char: '刀', pinyin: 'dao1', meaning: 'knife' },
  { char: '笔', pinyin: 'bi3', meaning: 'pen, brush' },
  { char: '纸', pinyin: 'zhi3', meaning: 'paper' },
  { char: '书', pinyin: 'shu1', meaning: 'book' },
  { char: '字', pinyin: 'zi4', meaning: 'character, word' },
  { char: '学', pinyin: 'xue2', meaning: 'study, learn' },
  { char: '工', pinyin: 'gong1', meaning: 'work, labor' },
  { char: '作', pinyin: 'zuo4', meaning: 'make, do' },
  { char: '用', pinyin: 'yong4', meaning: 'use' },
  { char: '买', pinyin: 'mai3', meaning: 'buy' },
  { char: '卖', pinyin: 'mai4', meaning: 'sell' },
  { char: '钱', pinyin: 'qian2', meaning: 'money' },
  { char: '店', pinyin: 'dian4', meaning: 'shop, store' },
  { char: '市', pinyin: 'shi4', meaning: 'city, market' },
  { char: '路', pinyin: 'lu4', meaning: 'road, path' },
  { char: '桥', pinyin: 'qiao2', meaning: 'bridge' },
  { char: '船', pinyin: 'chuan2', meaning: 'boat, ship' },
  { char: '飞', pinyin: 'fei1', meaning: 'fly' },
  { char: '走', pinyin: 'zou3', meaning: 'walk, go' },
  { char: '跑', pinyin: 'pao3', meaning: 'run' },
  { char: '站', pinyin: 'zhan4', meaning: 'stand, station' },
  { char: '坐', pinyin: 'zuo4', meaning: 'sit' },
  { char: '睡', pinyin: 'shui4', meaning: 'sleep' },
  { char: '吃', pinyin: 'chi1', meaning: 'eat' },
  { char: '喝', pinyin: 'he1', meaning: 'drink' },
  { char: '说', pinyin: 'shuo1', meaning: 'speak, say' },
  { char: '女', pinyin: 'nv3', meaning: 'woman, female' },
  { char: '子', pinyin: 'zi3', meaning: 'child, son' },
  { char: '王', pinyin: 'wang2', meaning: 'king' },
  { char: '玉', pinyin: 'yu4', meaning: 'jade' },
  { char: '竹', pinyin: 'zhu2', meaning: 'bamboo' },
  { char: '丝', pinyin: 'si1', meaning: 'silk, thread' },
  { char: '禾', pinyin: 'he2', meaning: 'grain, rice plant' },
  { char: '犬', pinyin: 'quan3', meaning: 'dog' },
  { char: '牙', pinyin: 'ya2', meaning: 'tooth, fang' },
  { char: '贝', pinyin: 'bei4', meaning: 'shell, money' },
  { char: '见', pinyin: 'jian4', meaning: 'see, meet' },
  { char: '页', pinyin: 'ye4', meaning: 'page, leaf' },
  { char: '风', pinyin: 'feng1', meaning: 'wind' },
  { char: '雨', pinyin: 'yu3', meaning: 'rain' },
  { char: '云', pinyin: 'yun2', meaning: 'cloud' },
  { char: '电', pinyin: 'dian4', meaning: 'electricity' },
  { char: '气', pinyin: 'qi4', meaning: 'air, breath' },
  { char: '冰', pinyin: 'bing1', meaning: 'ice' },
  { char: '雪', pinyin: 'xue3', meaning: 'snow' },
  { char: '力', pinyin: 'li4', meaning: 'strength, power' },
  { char: '刂', pinyin: 'dao1', meaning: 'knife radical' },
  { char: '又', pinyin: 'you4', meaning: 'again, right hand' },
  { char: '寸', pinyin: 'cun4', meaning: 'inch, small' },
  { char: '弓', pinyin: 'gong1', meaning: 'bow, arch' },
  { char: '彡', pinyin: 'shan1', meaning: 'hair, decoration' },
  { char: '夕', pinyin: 'xi1', meaning: 'evening, sunset' },
  { char: '广', pinyin: 'guang3', meaning: 'broad, wide' },
  { char: '厂', pinyin: 'chang3', meaning: 'factory, cliff' },
  { char: '斤', pinyin: 'jin1', meaning: 'catty, weight' },
  { char: '方', pinyin: 'fang1', meaning: 'square, direction' },
  { char: '户', pinyin: 'hu4', meaning: 'door, household' },
  { char: '尸', pinyin: 'shi1', meaning: 'corpse, body' },
  { char: '弋', pinyin: 'yi4', meaning: 'shoot, hunt' },
  { char: '戈', pinyin: 'ge1', meaning: 'spear, weapon' },
  { char: '斗', pinyin: 'dou3', meaning: 'fight, measure' },
  { char: '欠', pinyin: 'qian4', meaning: 'owe, lack' },
  { char: '止', pinyin: 'zhi3', meaning: 'stop, foot' },
  { char: '歹', pinyin: 'dai3', meaning: 'bad, evil' },
  { char: '殳', pinyin: 'shu1', meaning: 'weapon, rod' },
  { char: '毛', pinyin: 'mao2', meaning: 'hair, fur' },
  { char: '氏', pinyin: 'shi4', meaning: 'clan, family name' },
  { char: '片', pinyin: 'pian4', meaning: 'slice, piece' },
  { char: '牜', pinyin: 'niu2', meaning: 'cow radical' },
  { char: '礻', pinyin: 'shi4', meaning: 'spirit radical' },
  { char: '衤', pinyin: 'yi1', meaning: 'clothing radical' },
  { char: '讠', pinyin: 'yan2', meaning: 'speech radical' },
  { char: '钅', pinyin: 'jin1', meaning: 'metal radical' },
  { char: '饣', pinyin: 'shi2', meaning: 'food radical' },
  { char: '纟', pinyin: 'si1', meaning: 'silk radical' },
  { char: '艹', pinyin: 'cao3', meaning: 'grass radical' }
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

// Shuffle cards on startup using Fisher-Yates shuffle
for (var i = studyOrder.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  var temp = studyOrder[i];
  studyOrder[i] = studyOrder[j];
  studyOrder[j] = temp;
}
shuffled = true;

// Set up touch handler for navigation
function setupTouch() {
  var touchStart = null;
  
  Bangle.on('touch', function(button, xy) {
    if (!xy) return;
    
    if (button == 1) {
      // Touch start - record position
      touchStart = xy;
    } else if (button == 0 && touchStart) {
      // Touch end - check for swipe
      var deltaX = xy.x - touchStart.x;
      var absX = Math.abs(deltaX);
      
      // Check if it's a horizontal swipe (minimum 50 pixels)
      if (absX > 50) {
        if (deltaX > 0) {
          // Swipe left to right - next card
          nextCard();
        } else {
          // Swipe right to left - previous card
          previousCard();
        }
      } else {
        // Small movement - treat as tap to flip
        flipCard();
      }
      
      touchStart = null;
    }
  });
}

// Set up button for flipping cards and navigation
function setupButton() {
  var lastPress = 0;
  var doubleClickTime = 500; // 500ms window for double-click
  
  setWatch(function() {
    var now = getTime() * 1000; // Convert to milliseconds
    
    if (now - lastPress < doubleClickTime) {
      // Double-click detected - next card
      nextCard();
      lastPress = 0; // Reset to prevent triple-click
    } else {
      // Single click - wait to see if there's a second click
      setTimeout(function() {
        var timeNow = getTime() * 1000;
        if (timeNow - lastPress >= doubleClickTime) {
          // No second click came - do single click action
          flipCard();
        }
      }, doubleClickTime);
    }
    
    lastPress = now;
  }, BTN1, {repeat:true, edge:"falling"});
}

// Draw the flashcard manually
function showCard() {
  var char = characters[studyOrder[currentIndex]];
  var progress = (currentIndex + 1) + "/" + characters.length;
  var shuffleIndicator = shuffled ? " 🔀" : "";
  
  // Clear screen
  g.clear();
  
  // Set background
  g.setColor(0, 0, 0); // Black background
  g.fillRect(0, 0, g.getWidth(), g.getHeight());
  g.setColor(1, 1, 1); // White text
  
  if (!showingAnswer) {
    // Question side - show large character
    g.setFont("Intl", 4); // Large font for character
    var charWidth = g.stringWidth(char.char);
    var charX = (g.getWidth() - charWidth) / 2;
    g.drawString(char.char, charX, 60);
    
    // Progress indicator at top
    g.setFont("6x8", 1);
    g.drawString(progress + shuffleIndicator, 5, 5);
    
    // Instructions at bottom
    g.setFont("6x8", 1);
    g.drawString("BTN1: Answer", 5, g.getHeight() - 25);
    g.drawString("Double-click: Next", 5, g.getHeight() - 15);
    
  } else {
    // Answer side - show character + details
    g.setFont("Intl", 3); // Medium font for character
    var charWidth = g.stringWidth(char.char);
    var charX = (g.getWidth() - charWidth) / 2;
    g.drawString(char.char, charX, 20);
    
    // Progress indicator at top
    g.setFont("6x8", 1);
    g.drawString(progress + shuffleIndicator, 5, 5);
    
    // Pinyin
    g.setFont("6x8", 2);
    var pinyinWidth = g.stringWidth(char.pinyin);
    var pinyinX = (g.getWidth() - pinyinWidth) / 2;
    g.drawString(char.pinyin, pinyinX, 80);
    
    // Meaning
    g.setFont("6x8", 1);
    var meaningWidth = g.stringWidth(char.meaning);
    var meaningX = (g.getWidth() - meaningWidth) / 2;
    g.drawString(char.meaning, meaningX, 110);
    
    // Instructions at bottom
    g.setFont("6x8", 1);
    g.drawString("BTN1: Hide", 5, g.getHeight() - 25);
    g.drawString("Double-click: Next", 5, g.getHeight() - 15);
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

// Show welcome screen
function showWelcome() {
  g.clear();
  g.setColor(0, 0, 0);
  g.fillRect(0, 0, g.getWidth(), g.getHeight());
  g.setColor(1, 1, 1);
  
  g.setFont("6x8", 2);
  var titleWidth = g.stringWidth("Chinese");
  g.drawString("Chinese", (g.getWidth() - titleWidth) / 2, 30);
  
  titleWidth = g.stringWidth("Flashcards");
  g.drawString("Flashcards", (g.getWidth() - titleWidth) / 2, 50);
  
  g.setFont("6x8", 1);
  var countText = characters.length + " characters";
  var countWidth = g.stringWidth(countText);
  g.drawString(countText, (g.getWidth() - countWidth) / 2, 80);
  
  var instructWidth = g.stringWidth("Tap to start!");
  g.drawString("Tap to start!", (g.getWidth() - instructWidth) / 2, 110);
}

// Initialize the app
function init() {
  setupTouch();
  setupButton();
  
  // Show welcome screen
  showWelcome();
  
  // Auto-start after 3 seconds or wait for touch/button
  setTimeout(function() {
    showCard();
  }, 3000);
}

// Start the app
init();
