/*
=======================================================================
    JavaScript勉強会：人間工学・感性科学から学ぶユーザビリティ
=======================================================================

【今日の学習目標】
人間の認知特性や感性を理解し、より使いやすいWebインターフェースを作成する

【2つのMISSION】
MISSION 1【認知負荷の軽減】：スムーズスクロールでストレスフリーなナビゲーション
MISSION 2【アテンションの制御】：適切なタイミングと視覚効果でユーザーの注意を誘導

=======================================================================
*/

/*
========================================================================
 MISSION 1【認知負荷の軽減】スムーズスクロール実装
========================================================================
【人間工学ポイント】
急激な画面遷移は「認知的な断絶」を引き起こし、ユーザーが現在位置を見失う原因となります。
スムーズなスクロールは、空間的な連続性を保ち、ストレスを軽減します。
========================================================================
*/

function setupSmoothScroll() {
    // メニュー内のリンクにクリックイベントを設定
    document.querySelectorAll(".slide-menu a").forEach((a) => {
        a.addEventListener("click", (e) => {
            e.preventDefault(); // デフォルトのジャンプ動作を無効化
            
            // クリックされたリンクの移動先IDを取得
            const targetId = a.getAttribute("href").replace("#", "");
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 🔥 MISSION 1 ここを編集してください
                
                // × 悪い例：瞬間移動（ユーザーが現在位置を見失いやすい）
                targetElement.scrollIntoView({ behavior: "auto" , block: "start"});
                
            }
        
            setTimeout(() => {
                const btn = document.getElementById("menu-toggle");
                btn.checked = false;
                toggleMenu();
            }, 100);
        });
    });
}

/*
========================================================================
 MISSION 2【アテンションの制御】メニュー開閉とタイミング制御
========================================================================
【人間工学ポイント】
メニュー開閉時の視覚効果とタイミングは、ユーザーの注意を適切にコントロールし、
操作の「区切り」を明確にして認知負荷を軽減します。
========================================================================
*/

function toggleMenu() {
    const btn = document.getElementById("menu-toggle");
    const menu = document.querySelector(".slide-menu");
    const main = document.querySelector("main");
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    console.log((btn.checked) ? "\u001b[32mopen\u001b[0m" : "\u001b[31mclose\u001b[0m");
    
    // メニューの開閉状態を切り替え
    menu.classList.toggle("open");
    
    // 🔥 MISSION 2: ここで段階的な視覚フィードバックを実装
    
    if (btn.checked) {
        // 【実験1】視覚効果を変更して印象の違いを確認してみよう！
        //  ヒント：main.classList.add("");の("")の中に下記のcode入れてみよう！！
        // - "inactive"      → 標準のぼかし効果（オレンジのオーバーレイ）
        // - "dark-overlay"  → ダークモード風（グレースケール＋暗く）
        // - "glass-effect"  → ガラス風エフェクト（透明感のあるぼかし）
        // - "zoom-out"      → ズームアウト効果（縮小＋薄く＋軽いぼかし）
        // - "inverted"      → 色反転効果（ネガティブフィルム風）
        setTimeout(() => {
            main.classList.add("");
        }, 0); 

        } else {
        //  注意：ここも上で変更したクラス名と同じものを使ってください
        main.classList.remove("");  
    }
        // 【実験2】遅延時間を変更して体感の違いを確認してみよう！
        //  ヒント：数値を変えて、どの時間が一番自然に感じるか試してみてください
        // ← この数値を変更！ おすすめ実験値: 0, 50, 150, 300, 500, 1000
        // 【人間工学的評価ポイント】実験後に以下の観点で評価してみよう！

        // 🕐 遅延時間の効果：
        //   - 0ms    → 瞬間的すぎて誤操作感がある？
        //   - 50ms   → 気づかないレベル？
        //   - 150ms  → 「意図的な変化」として認識しやすい？
        //   - 300ms  → 自然な動作として感じる？
        //   - 500ms+ → 遅すぎてストレス？
           

    
    // ヘッダーとフッターに影をつける（視覚的な区切り効果）
    if (btn.checked) {
        header.classList.add('with-shadow');
        footer.classList.add('with-shadow');
    } else {
        header.classList.remove('with-shadow');
        footer.classList.remove('with-shadow');
    }
}

function setupMenuControls() {
    const btn = document.getElementById("menu-toggle");
    const menu = document.querySelector(".slide-menu");
    
    // メニューチェックボックスの状態変更を監視
    btn.addEventListener("change", () => {
        toggleMenu();
    });

    // ========== メニュー外クリックでの自動クローズ ==========
    document.addEventListener("click", function (e) {
        const isInsideMenu = menu.contains(e.target);  // メニュー内のクリックかどうか
        const isMenuButton = btn.contains(e.target);   // ハンバーガーボタンのクリックかどうか
        const isChecked = btn.checked;  // メニューが開いているかどうか

        // メニュー外をクリックした場合にメニューを閉じる
        if (!isInsideMenu && !isMenuButton && isChecked) {
            console.log("\u001b[35mscript\u001b[0m(out): \u001b[31mclose\u001b[0m")
            
            setTimeout(() => {
                btn.checked = false;
                toggleMenu();
            }, 200);
        }
    });

    // ========== ハンバーガーボタンでのメニュー開閉 ==========
    document.querySelector(".menu-button").addEventListener("click", (e) => {
        e.stopPropagation(); // イベントバブリングを停止
        btn.checked = !btn.checked;  // メニュー状態を切り替え
        if (!btn.checked) console.log("\u001b[35mscript\u001b[0m(x): \u001b[31mclose\u001b[0m");
        toggleMenu();
    });
}

/*
========================================================================
 共通機能：MISSION関係外のコード
========================================================================
*/

// 紙吹雪エフェクトを作成する関数（お疲れ様用）
function createConfettiEffect(targetElement) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const confettiCount = 15; // 紙吹雪の枚数
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // ランダムな色を選択
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 紙吹雪のサイズをランダムに
        const size = Math.random() * 6 + 4; // 4-10px
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // 開始位置をチェックボックス要素の中心に設定
        const rect = targetElement.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        
        confetti.style.position = 'fixed';
        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '2px';
        confetti.style.zIndex = '9999';
        
        // ランダムな方向と距離を設定
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = Math.random() * 100 + 50; // 50-150px
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        // アニメーション設定
        confetti.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        document.body.appendChild(confetti);
        
        // アニメーション開始（少し遅延を入れて自然な散らばりを演出）
        setTimeout(() => {
            confetti.style.transform = `translate(${endX - startX}px, ${endY - startY}px) rotate(${Math.random() * 360}deg)`;
            confetti.style.opacity = '0';
        }, i * 20); // 各紙吹雪に20msずつ遅延
        
        // アニメーション後に要素を削除
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 1000);
    }
}

// 全完了時の特別な祝福エフェクト（お疲れ様用）
function createCelebrationEffect() {
    // 大量の紙吹雪を画面全体に散らす
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const celebrationCount = 50;
    
    for (let i = 0; i < celebrationCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'celebration-confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const size = Math.random() * 8 + 6;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // 画面上部からランダムな位置でスタート
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        // 落下アニメーション
        const fallDuration = Math.random() * 2000 + 2000; // 2-4秒で落下
        const horizontalDrift = (Math.random() - 0.5) * 200; // 左右に揺らぎ
        
        confetti.style.transition = `transform ${fallDuration}ms ease-in, opacity 0.5s ease-out`;
        
        setTimeout(() => {
            confetti.style.transform = `translateY(${window.innerHeight + 20}px) translateX(${horizontalDrift}px) rotate(720deg)`;
            // 最後の0.5秒で徐々に消える
            setTimeout(() => {
                confetti.style.opacity = '0';
            }, fallDuration - 500);
        }, i * 50);
        
        // 要素をクリーンアップ
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, fallDuration + 1000);
    }
    
    // 完了メッセージを表示
    showCompletionMessage();
}

// 完了メッセージを表示（お疲れ様用）
function showCompletionMessage() {
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.innerHTML = `
        <h3>🎉 勉強会お疲れ様でした！ 🎉</h3>
        <p>素晴らしい学習でした！<br>これからも頑張ってください！</p>
    `;
    
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%) scale(0.8)';
    message.style.backgroundColor = '#2D3748';
    message.style.color = 'white';
    message.style.padding = '20px';
    message.style.borderRadius = '10px';
    message.style.textAlign = 'center';
    message.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
    message.style.zIndex = '10000';
    message.style.opacity = '0';
    message.style.transition = 'all 0.3s ease-out';
    
    document.body.appendChild(message);
    
    // アニメーション開始
    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
    
    // 3秒後に自動で消去
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        // メッセージが消える際にinactive効果も削除
        const main = document.querySelector('main');
        main.classList.remove('inactive');
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// 勉強会完了チェック機能
function setupWorkshopCompletion() {
    const completionCheckItem = document.getElementById('workshop-completion-check');
    const completionMessage = document.getElementById('completion-message');
    
    if (completionCheckItem) {
        completionCheckItem.addEventListener('click', () => {
            const checkbox = completionCheckItem.querySelector('.completion-checkbox');
            const text = completionCheckItem.querySelector('.completion-text');
            
            // 既にチェック済みの場合は何もしない
            if (completionCheckItem.classList.contains('completed')) return;
            
            // ✅ チェックマークの変更と跳ねるアニメーション
            checkbox.textContent = '✅';
            completionCheckItem.classList.add('completed');
            
            // チェックマークを軽快に跳ねさせる
            checkbox.style.animation = 'bounce-check 0.5s ease-out';
            
            // 背景にinactive効果を追加してメッセージを見やすくする
            const main = document.querySelector('main');
            main.classList.add('inactive');
            
            // 「お疲れ様でした！」メッセージを表示
            if (completionMessage) {
                completionMessage.classList.remove('hidden');
                completionMessage.style.animation = 'fadeIn 0.5s ease-out';
            }
            
            // 紙吹雪エフェクトを発生させる
            setTimeout(() => {
                createConfettiEffect(completionCheckItem);
            }, 250);
            
            // 全完了祝福エフェクト
            setTimeout(() => {
                createCelebrationEffect();
            }, 800);
        });
    }
}


/*
========================================================================
 共通機能：目次の自動生成
========================================================================
*/

// ページ内のh1タグを自動で取得して、ハンバーガーメニューの目次を作成
function generateHambergerNav() {
    // すべてのh1要素を取得
    let h1List = document.querySelectorAll("h1");
    // 目次を追加するul要素を取得
    let ul = document.querySelector("#slide-menu-ul");
    
    // 各h1要素に対して目次項目を作成
    h1List.forEach((h1E, i = 0) => {
        // ignore-indexクラスがついているものはスキップ
        if (h1E.classList.contains("ignore-index")) return;
        
        // IDがない場合は自動でIDを付与
        if (!h1E.id) h1E.id = "ht-" + i;
        
        // リスト項目とリンクを作成
        let liTag = document.createElement("li");
        let aTag = document.createElement("a");
        let txt = document.createTextNode(h1E.textContent);
        aTag.appendChild(txt);
        aTag.href = "#" + h1E.id;
        liTag.appendChild(aTag);
        ul.appendChild(liTag);
        i++;
    });
}



window.onload = () => {
    // 目次の自動生成を実行
    generateHambergerNav();
    
    // MISSION 1: スムーズスクロールの設定
    setupSmoothScroll();
    
    // MISSION 2: メニュー制御（アテンションの制御）の設定
    setupMenuControls();
    
    // 勉強会完了チェック機能の設定
    setupWorkshopCompletion();
};

/*
========================================================================
🎯 MISSION完了後の学習ポイント
========================================================================

✅ MISSION 1【認知負荷の軽減】
- behavior: "smooth" により、急激な画面遷移を防げましたか？
- ユーザーがスクロール中も「現在位置」を把握しやすくなりましたか？

✅ MISSION 2【アテンションの制御】
- 適切な遅延時間により「誤操作感」は軽減されましたか？
- ぼかし効果のタイミングで、ユーザーの注意が適切にメニューに向きましたか？
- メニュー開閉の非対称タイミングで自然な操作感を実現できましたか？

💡 人間工学の応用ポイント：
- 0.1〜0.3秒：瞬間的な応答（クリック感）
- 0.3〜0.6秒：自然な動作（アニメーション）
- 0.6秒以上：意図的な遅延（誤操作防止）

========================================================================
*/