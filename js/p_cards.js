document.addEventListener('DOMContentLoaded', function () {

    let section = document.getElementById("1")

    section.addEventListener('click', function (event)
    {
       let target = event.target.id
       if (!target)
       {
           return

       }
       else
       {

           showText(target.substring((4)))
       }

    })

    function showText(cardId){
        let cardText = document.getElementById("text-"+ cardId)
        if (cardText.classList.contains("text-hidden"))
        {
            cardText.classList.remove("text-hidden")
            cardText.style.animation = "dropText 1.5s ease"
        }
        else
        {

            cardText.style.animation = "popText 1.5s ease"
            setTimeout( () => cardText.classList.add("text-hidden"), 1500)
        }
    }



});
