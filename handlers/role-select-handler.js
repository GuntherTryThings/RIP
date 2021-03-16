module.exports = (message, roles) => {
    const member = message.member;
    removeAllRoles(member, roles);
    addSelectedRole(member, roles);
};

function removeAllRoles(member, roles) {
    roles.removeable.forEach((role, index) => {
        member.roles.remove(role);
    });
}

function addSelectedRole(member, roles) {
    for (let role of roles.selected) member.roles.add(role);
}