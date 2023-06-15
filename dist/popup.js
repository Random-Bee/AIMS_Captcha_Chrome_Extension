var n = 1;
document.getElementById('box').addEventListener('click', function(){
    n = (n*2)%63;
    document.getElementById('box').innerHTML = '🥸'.repeat(n);
});