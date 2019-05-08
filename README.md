# Project 3
Een project voor lifely. Tijdens dit project ga ik een chat applicatie maken dat mensen verbinden met een intermediar, zodat deze intermediar best passende werk kan verwijzen voor de bezoekers.


## Technologiën

Technologiën:
*   Express
*   Socket.io
*   Vue.js/Ejs

Misschien gebruiken:
* MongoDB
* GraphQL
* Apollo Client

De reden waarom ik misschien apollo en GraphQL ga gebruiken is, omdat ik geen kennis heb van beide techologiën en in om 1 week dit nog allemaal te leren. En mongodb heb ik nauwelijks kennis van dus daar twijfel ik ook nog over.

## Wat heb ik gedaan?
Een log van wat ik deze week allemaal gedaan heb.

### Maandag 6 mei 2019
Vandaag heb ik onderzoek gedaan naar GraphQL en Apollo en sequence diagrams.

GraphQL bronnen:
* [Traversy Media GraphQL serverside Tutorial](https://www.youtube.com/watch?v=SEMTj8w04Z8&list=PLillGF-RfqbZrjw48EXLdM4dsOhURCLZx)
* [Net Ninja GraphQL Tutorial](https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f)

Wat heb ik geleerd over GraphQL:
*   GraphQL zorgt ervoor dat je geen meerdere requests hoeft te maken als je een bepaalde item nodig heb.
*   Scheelt internet breedband
*   Apollo client zorgt ervoor dat je op de clientside met GraphQL query code kan gebruiken om data op te halen van de GraphQL API

Hieronder zie je een voorbeeld waarom GraphQL handig is om te gebruiken. Bij een restful api zou je voor hetzelfde resultaat 2 fetches moeten starten, omdat je bij de autheur book id's terug zou krijgen en daarvan moet je weer een fetch gaan starten. Met GraphQL hoef je maar een request te sturen dat er zo uit ziet dan, om alle boeken van een bepaalde auteur op te halen.

GraphQL voorbeeld: 
```js
// Query to get book data an its author data(AND other books)
{
    book(id:123){
        title
        genre
        reviews{
            author{
                name
                bio{
                    books{
                        name
                    }
                }
            }
        }
    }   
}
// Je kan ook ervoor kiezen om sommige property's in een object maar terug te krijgen.
```