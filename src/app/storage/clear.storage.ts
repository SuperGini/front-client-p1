window.onbeforeunload = () => {
    localStorage.removeItem('username');
}
