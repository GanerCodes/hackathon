prev = window.onload();
window.onload = () => {
    prev && prev();
    if(isLoggedIn()) {
        checkGroupMembership();
    }
}

function checkGroupMembership() {
    getGroupIBelongTo().then(group_id => {
        switchToUserScreen();
    }).catch(err => {
        reset_swaps();
        swap("loginScreen", "groupJoinScreen");
    });
}

function logInSignUp(type) {
    const usernameElm = document.getElementById("username");
    if(!checkWarnTextVal(usernameElm)) return;
    const passwordElm = document.getElementById("password");
    if(!checkWarnTextVal(passwordElm)) return;
    
    const username = usernameElm.value;
    const password = passwordElm.value;
    
    login(username, password);
}

function joinGroupButton() {
    const usernameElm = document.getElementById("groupID");
    if(!checkWarnTextVal(usernameElm)) return;
    const group_id = usernameElm.value;
    reset_swaps();
    checkGroupMembership();
}

async function switchToUserScreen() {
    reset_swaps();
    swap("login_gui", "user_panel");
    const myPoints  = await getMyPoints();
    const myTasks   = await getTasksFromGroupIBelong();
    const myRewards = await getRewardsFromGroupIBelong();
    
    const userInfoTextElm = document.getElementById("userInfoText");
    userInfoTextElm.innerHTML = `${username} - ${myPoints} points`;
}