window.onload = function(){
    let shuffle = document.getElementById("shuffle")
    let select = document.getElementById("select")
    let size = document.getElementById("size")
    let sort_in_progress = 0
    shuffle.onclick = function(){
        if(sort_in_progress === 1) return;
        let chosen = []
        let n = document.getElementById('size').value
        for(let i=0; i<n; i++){
            chosen[i] = 0
        }
        for(let i=0; i<n; i++){
            var rng
            do{
                rng = Math.floor(Math.random() * n)
            }while(chosen[rng] === 1)
            var element = document.getElementById("pos" + i)
            chosen[rng] = 1
            element.innerHTML = rng
            element.style.backgroundColor = "#DFE4F0"
        }
    }
    select.onclick = async function(){
        if(sort_in_progress === 1) return;
        sort_in_progress = 1;
        var n = document.getElementById('size').value
        for(var i=0; i<n; i++){
            var head = document.getElementById("pos" + i)
            head.style.backgroundColor = "lightcoral";
            await new Promise(resolve => setTimeout(resolve, 500));
            var minimum = parseInt(head.innerHTML);
            var pos_min = i;
            for(var j=i+1; j<n; j++){
                var pointer = document.getElementById("pos" + j)
                pointer.style.backgroundColor = "lightyellow"
                if(j>i+1 && document.getElementById("pos" + (j-1)).style.backgroundColor != "lightcoral") 
                    document.getElementById("pos" + (j-1)).style.backgroundColor = "#DFE4F0"
                if(minimum > parseInt(pointer.innerHTML)){
                    document.getElementById("pos" + pos_min).style.backgroundColor = "#DFE4F0"
                    pos_min = j
                    minimum = parseInt(pointer.innerHTML)
                    pointer.style.backgroundColor = "lightcoral"
                }
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            var aux = head.innerHTML
            head.innerHTML = minimum
            document.getElementById("pos" + pos_min).innerHTML = aux;
            head.style.backgroundColor = "lightgreen"
            for(var j=i+1; j<n; j++){
                document.getElementById("pos" + j).style.backgroundColor = "#DFE4F0";
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        sort_in_progress = 0;
    }
    size.onchange = function(){
        while(vector.firstChild) vector.removeChild(vector.firstChild)
        for(let i=0; i<document.getElementById('size').value; i++){
            let num = document.createElement("div")
            num.id = "pos" + i
            num.style.width = 75 / size + "px"
            num.style.aspectRatio = "1"
            num.innerHTML = i
            vector.appendChild(num)
        }
    }
}