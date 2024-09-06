const button_play = document.getElementById('character-select') //Botão para entrar na seleção de personagens
const battle_log = document.getElementById('log-de-batalha') //LOG DE BATALHA
const cards_menu = document.getElementById('cards_menu') //MENU DAS CARTAS
const cards_section = document.getElementById('cards-section-create') //SECTION DAS CARTAS
const config_menu = document.getElementById('config-menu') //MENU CONFIGURAÇÕES
const rules_menu = document.getElementById('rules') //MENU DE REGRAS
const select_dificultty = document.getElementById('select-dificultty') //BOTÃO
const div = document.getElementById('class_select_menu') //Div da seleção de persoangens
const button_return = document.getElementById('return') //Botão de retorno dentro da div de seleção de peronsagens
const player_define_warrior = document.getElementById('warrior') //Botão de escolha do Warrior
const player_define_wizard = document.getElementById('wizard') //Botão de escolha do Wizard
const terrain_battle = document.getElementById('terrain-scene') //Variavel para controle do plano de fundo lateral
const bg_menu = document.getElementById('background-menu') //Variavel para controle do plano de fundo de batalha
const mn_combat = document.getElementById('combat_menu') //Variavel do menu de combate
const main_menu = document.getElementById('main-menu') //Variavel do menu principal
const overlay_bg = document.getElementById('overlay-logo') //variavel do overlay
const playercard = document.getElementById('card-player') //variavel da carta
const img_player = document.getElementById('img-player-define') //variavel da imagem da carta
const card_enemy = document.getElementById('card-enemy') // variavel da carta inimiga
const img_enemy_real = document.getElementById('img-enemy-define') // variavel da imagem da carta inimiga
const hp_enemy_number = document.getElementById('hp-enemy') // define o HP do inimigo
const def_enemy_number = document.getElementById('def-enemy') // define a defesa do inimigo
const hp_player_number = document.getElementById('hp-player') //define o HP do aliado
const def_player_number = document.getElementById('def-player')// define a def do aliado
const player_name = document.getElementById('player-name') //define o nome do player baseado na classe
const enemy_name = document.getElementById('enemy-name') //define o nome do inimigo baseado no mesm
const end_screen = document.getElementById('final-menu') //controle da tela de end
const ms_final = document.getElementById('msg-win-lose') //mensagem final

let difficulty = 0

let player = { //Jogador
    name_player: '',
    hp_player: 0,
    atk_player: 0,
    def_player: 0,
    image_url: ''
};

let enemy = { //Inimigo
    name_enemy: '',
    hp_enemy: 0,
    atk_enemy: 0,
    def_enemy: 0,
    image_url: ''
}
let player_def_fixed = 0 //Defesa fixa para reset
let enemy_def_fixed = 0 // Defesa fixa inimiga para reset
let danamge_multiplier = 1 //multiplicador de dano inimigo
let player_damage_mult = 1 //multiplicador de dano aliado


//Está função faz com que o menu mude para o de seleção de personagem
function criar_menu_character_select() { 
    if (div.style.display == 'none') {
        div.style.display = 'flex'
        }
    else {
        div.style.display = 'none'
    }
};

//Está função faz com que você retorne para o Menu principal a partir do menu de seleção de peronsagem
function retornar_menu_principal() { 
    if (div.style.display == 'flex' || cards_menu.style.display == 'flex' || config_menu.style.display == 'flex' || rules_menu.style.display =='flex') {
        div.style.display = 'none'
        config_menu.style.display = 'none'
        cards_menu.style.display = 'none'
        rules_menu.style.display = 'none'
        main_menu.style.display ='flex'
    } else {
        div.style.display = 'flex'
     }
};

//Cria o menu das cartas
function criar_menu_cartas() {
    if (cards_menu.style.display == 'none') {
        cards_section.innerHTML = ''
        cards_menu.style.display = 'flex'
        for (const card_cards of players) {
            console.log('sim')
            cards_section.innerHTML += `<div class="cards-limiter">
                    <h3 id="cards-name">${card_cards.name}</h3>
                    <img src="${card_cards.image_url}" alt="card-image" id="card-image">
                    <h5 id="cards-hp">${card_cards.hp}</h5>
                    <h5 id="cards-def">${card_cards.def}</h5>
                </div>`;
            }
        for (const card_cards of warrior_enemies) {
            console.log('sim')
            cards_section.innerHTML += `<div class="cards-limiter">
                    <h3 id="cards-name">${card_cards.name}</h3>
                    <img src="${card_cards.image_url}" alt="card-image" id="card-image">
                    <h5 id="cards-hp">${card_cards.hp}</h5>
                    <h5 id="cards-def">${card_cards.def}</h5>
                </div>`;
        }
        for (const card_cards of wizard_enemies) {
            console.log('sim')
            cards_section.innerHTML += `<div class="cards-limiter">
                    <h3 id="cards-name">${card_cards.name}</h3>
                    <img src="${card_cards.image_url}" alt="card-image" id="card-image">
                    <h5 id="cards-hp">${card_cards.hp}</h5>
                    <h5 id="cards-def">${card_cards.def}</h5>
                </div>`;
        }
    } else {
        cards_menu.style.display = 'none'
    }
}

//Cria o menu das opções
function criar_menu_options() {
    main_menu.style.display = 'none'
    config_menu.style.display = 'flex'
    if (difficulty == 0) {
        select_dificultty.textContent = 'Fácil'
    } else if (difficulty == 1) {
        select_dificultty.textContent = 'Medio'
    } else if (difficulty == 2) {
        select_dificultty.textContent = 'Díficil'
    } else {
        select_dificultty.textContent = 'Dragão'
    }

}

function criar_menu_regras() {
    main_menu.style.display = 'none'
    rules_menu.style.display = 'flex'

}

//Modifica a dificuldade
function change_difficulty() {
    if (difficulty == 0) {
        difficulty = 1
        select_dificultty.textContent = 'Medio'
    } else if (difficulty == 1) {
        difficulty = 2
        select_dificultty.textContent = 'Díficil'
    } else if (difficulty == 2) {
        difficulty = 3
        select_dificultty.textContent = 'Dragão'
    } else {
        difficulty = 0
        select_dificultty.textContent = 'Fácil'
    }
};


//Está função define corretamente os atributos do jogador baseado na classe escolhida e inicia o jogo
function game_start_on_warrior() { 
    player.atk_player = players[0].atk;
    player.hp_player = players[0].hp;
    player.def_player = players[0].def;
    player.name_player = players[0].name;
    player.image_url = players[0].image_url;
    player_def_fixed = player.def_player
    game_start()
};


//Está função define corretamente os atributos do jogador baseado na classe escolhida e inicia o jogo
function game_start_on_wizard() {
    player.atk_player = players[1].atk
    player.hp_player = players[1].hp
    player.def_player = players[1].def
    player.name_player = players[1].name
    player.image_url = players[1].image_url;
    player_def_fixed = player.def_player
    playercard.style.animation = ''
    card_enemy.style.animation = ''
    game_start()
}

//Escolhe qual inimigo vai combater o jogador
function enemy_selector() { 
    if (difficulty == 0) { //Dificuldade Facil
    random = Math.floor(Math.random() * 2);
    } else if (difficulty == 1) { //Dificuldade Medio
        random = Math.floor(Math.random() * 3);
    } else if (difficulty == 2) { //Dificuldade Dificil
        random = Math.floor(Math.random() * 3) + 2;
    } else {
        random = 5
    }
    card_enemy.style.display = 'flex'
    if (player.name_player == 'Wizard' && random != 5) {
        img_enemy_real.src = warrior_enemies[random].image_url
        enemy.atk_enemy = warrior_enemies[random].atk
        enemy.hp_enemy = warrior_enemies[random].hp
        enemy.def_enemy = warrior_enemies[random].def
        enemy.name_enemy = warrior_enemies[random].name
        hp_enemy_number.textContent = enemy.hp_enemy
        def_enemy_number.textContent = enemy.def_enemy
        enemy_name.textContent = enemy.name_enemy
    } else {
        img_enemy_real.src = wizard_enemies[random].image_url
        enemy.atk_enemy = wizard_enemies[random].atk
        enemy.hp_enemy = wizard_enemies[random].hp
        enemy.def_enemy = wizard_enemies[random].def
        enemy.name_enemy = wizard_enemies[random].name
        hp_enemy_number.textContent = enemy.hp_enemy
        def_enemy_number.textContent = enemy.def_enemy
        enemy_name.textContent = enemy.name_enemy
    }
    enemy_def_fixed = enemy.def_enemy
}

//Está função modifica a imagem da tela inicial para a tela de combate
function battle_terrain(classe='') {
    if (terrain_battle.style.display == 'none') {
        terrain_battle.style.display = 'flex'
        bg_menu.style.display = 'none'
        main_menu.style.display ='none'
        mn_combat.style.display ='flex'
        playercard.style.display = 'flex'
        img_player.src = player.image_url
        hp_player_number.textContent = player.hp_player
        def_player_number.textContent = player.def_player
        player_name.textContent = player.name_player
        if (classe == 'Wizard') {
            overlay_bg.style.backgroundImage = 'linear-gradient(to right, rgba(60, 145, 230, 1), rgba(250, 130,76, 1))'
        }

    } else {
        terrain_battle.style.display = 'none'
        bg_menu.style.display = 'flex'
    }
}

//Inicia o jogo
function game_start() {
    battle_terrain(player.name_player)
    enemy_selector()
}

//finaliza o jogo
function game_end() {
    if (player.hp_player <= 0) {
        playercard.style.animation = 'dead-cards 2s'
        playercard.addEventListener('animationend', function() {
            // Exibe a tela de fim de jogo e oculta os outros elemento
            playercard.style.display = 'none';
            mn_combat.style.display ='none'
            div.style.display = 'none'
            end_screen.style.display ='flex'
            ms_final.textContent = 'Você Perdeu'
            playercard.style.animation = ''

    })
} else if (enemy.hp_enemy <= 0) {
    card_enemy.style.animation = 'dead-cards 2s'
    card_enemy.addEventListener('animationend', function() {
        // Exibe a tela de fim de jogo e oculta os outros elementos
        card_enemy.style.display = 'none';
        mn_combat.style.display ='none'
        div.style.display = 'none'
        end_screen.style.display = 'flex'
        ms_final.textContent = 'Você Venceu'
        card_enemy.style.animation = ''
    })
    } 

}   

//reseta o jogo para outra partida
function reset() {
    end_screen.style.display = 'none'
    main_menu.style.display = 'flex'
    mn_combat.style.display = 'none'
    div.style.display = 'none'
    bg_menu.style.display ='flex'
    playercard.style.display ='none'
    card_enemy.style.display ='none'
    terrain_battle.style.display='none'
    battle_log.innerHTML = ''

}

//Função para definir a ação do inimigo
function enemy_action() {
    action = Math.floor(Math.random()*3)
    return action
}

//Função para ver se o alvo esquiva ou não
function esquivar() {
    let escape = Math.floor(Math.random() * 2)
    if (escape == 1) {
        return true
    } else {
        return false
    }
}

function enemy_IA_ATK() { //IA DO INIMIGO CASO O JOGADOR ATAQUE
    oponent_action = enemy_action()
    if (oponent_action == 0) { //Inimigo atacou também
        dano = Math.max(0,enemy.atk_enemy*danamge_multiplier - player.def_player)
        player.hp_player -= dano
        danamge_multiplier = 1
        battle_log.innerHTML += `<h4>${enemy.name_enemy} atacou ${player.name_player};</h4>`
        if (player.def_player > player_def_fixed) { //reseta a defesa do player caso esteja dobrada
            player.def_player = player_def_fixed
            def_player_number.textContent = player.def_player
        }
    }else if (oponent_action == 1) { //Inimigo defende
            if (enemy.def_enemy == enemy_def_fixed) { //dobra a defesa
            enemy.def_enemy *= 2
            def_enemy_number.textContent = enemy.def_enemy
            battle_log.innerHTML += `<h4>${enemy.name_enemy} se defendeu e dobrou sua defesa para resistir ao proximo ataque;</h4>`   
        } else { //não permite a dobra de defesa quando já está dobrado
            battle_log.innerHTML += `<h4>${enemy.name_enemy} tentou se defender mas sua defesa não ficará mais poderosa;</h4>`
        }
        
    }else { //Inimigo tenta esquivar
        if (esquivar() == true) {
            battle_log.innerHTML += `<h4>${enemy.name_enemy} se esquivou do ataque de ${player.name_player}, por causa disso, seu dano será dobrado até o proximo ataque;</h4>`
            danamge_multiplier = 2
            return 1
        } else {
            battle_log.innerHTML += `<h4>${enemy.name_enemy} tentou se esquivar do ataque de ${player.name_player}, mas falhou e recebeu o dano assim mesmo;</h4>`
        }
    }
}

function enemy_IA_DEF() { //IA DO INIMIGO CASO O JOGADOR DEFENDA
    oponent_action = enemy_action()
    if (oponent_action == 0) { //Inimigo atacou também
        dano = Math.max(0,enemy.atk_enemy*danamge_multiplier - player.def_player)
        player.hp_player -= dano
        danamge_multiplier = 1
        battle_log.innerHTML += `<h4>${enemy.name_enemy} atacou ${player.name_player};</h4>`
        console.log(player_def_fixed)
        if (player.def_player > player_def_fixed) { //reseta a defesa do player caso esteja dobrada
            player.def_player = player_def_fixed
            def_player_number.textContent = player.def_player
        }
    }else if (oponent_action == 1) { //Inimigo defende
        if (enemy.def_enemy == enemy_def_fixed) { //dobra a defesa
            enemy.def_enemy *= 2
            def_enemy_number.textContent = enemy.def_enemy
            battle_log.innerHTML += `<h4>${enemy.name_enemy} se defendeu e dobrou sua defesa para resistir ao proximo ataque;</h4>`
            } else {
            battle_log.innerHTML += `<h4>${enemy.name_enemy} tentou se defender mas sua defesa não ficará mais poderosa;</h4>`
            }
    } else { //Inimigo tenta esquivar
        battle_log.innerHTML += `<h4>${enemy.name_enemy} tentou se esquivar do ataque de ${player.name_player}, mas ele não atacou;</h4>`
    }
}

function enemy_IA_ESQ () { //IA DO INIMIGO CASO O JOGADOR ESQUIVE
    oponent_action = enemy_action()
    if (oponent_action == 0) { //Inimigo atacou também
        battle_log.innerHTML += `<h4>${enemy.name_enemy} atacou ${player.name_player};</h4>`
        if (esquivar() == true) { //se o inimigo atacar, verifica se o player esquivou
            battle_log.innerHTML += `<h4>${player.name_player} se esquivou do ataque de ${enemy.atk_enemy}, por causa disso, seu dano será dobrado até o proximo ataque;</h4>`
            player_damage_mult = 2
        } else {
            battle_log.innerHTML += `<h4>${player.name_player} tentou se esquivar do ataque de${enemy.name_enemy}, mas falhou e recebeu o dano assim mesmo;</h4>`
            dano = Math.max(0,enemy.atk_enemy*danamge_multiplier - player.def_player)
            player.hp_player -= dano
            danamge_multiplier = 1
            if (player.def_player > player_def_fixed) { //reseta a defesa do player caso esteja dobrada
                player.def_player = player_def_fixed
                def_player_number.textContent = player.def_player
            }
        }
    }else if (oponent_action == 1) { //Inimigo defende
            battle_log.innerHTML += `<h4>${player.name_player} tentou se esquivar mas ${enemy.name_enemy} não atacou;</h4>` 
            if (enemy.def_enemy == enemy_def_fixed) { //dobra a defesa
            enemy.def_enemy *= 2
            def_enemy_number.textContent = enemy.def_enemy
            battle_log.innerHTML += `<h4>${enemy.name_enemy} se defendeu e dobrou sua defesa para resistir ao proximo ataque;</h4>`
        } else { //não permite a dobra de defesa quando já está dobrado
            battle_log.innerHTML += `<h4>${enemy.name_enemy} tentou se defender mas sua defesa não ficará mais poderosa;</h4>`
        }
        
    }else { //Inimigo tenta esquivar
            battle_log.innerHTML += `<h4>${enemy.name_enemy} e ${player.name_player}se esquivam ao mesmo tempo, nada acontece;</h4>`

    } 
}  

function attack() { //player ataca
    battle_log.innerHTML += `<h4>${player.name_player} atacou ${enemy.name_enemy};</h4>` 
    if (enemy_IA_ATK() == true) {
        dano = 0
    } else{
        dano = Math.max(0,player.atk_player*player_damage_mult - enemy.def_enemy)
    }
    console.log(dano)
    enemy.hp_enemy -= dano
    hp_player_number.textContent = player.hp_player
    hp_enemy_number.textContent = enemy.hp_enemy
    player_damage_mult = 1
    console.log(enemy_def_fixed)
    if (enemy.def_enemy > enemy_def_fixed) { //reseta defesa do inimigo caso ela esteja dobrada
        enemy.def_enemy = enemy_def_fixed
        def_enemy_number.textContent = enemy.def_enemy
    }
    game_end()
}
    
function defense() { //PLAYER DEFENDE
    if (player.def_player == player_def_fixed) { //dobra a defesa
        player.def_player *= 2
        def_player_number.textContent = player.def_player
        battle_log.innerHTML += `<h4>${player.name_player} se defendeu e dobrou sua defesa para resistir ao proximo ataque;</h4>`
    } else { //não permite a dobra de defesa quando já está dobrado
        battle_log.innerHTML += `<h4>${enemy.name_enemy} tentou se defender mas sua defesa não ficará mais poderosa;</h4>`
    }
    enemy_IA_DEF()
    game_end()
}

function esquiva() { //PLAYER ESQUIVA
    enemy_IA_ESQ()
    hp_player_number.textContent = player.hp_player
    game_end()
}