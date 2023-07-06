function getLogo(platformList)
{
    let platformVar;
    switch(platformList) {
    
        case "PC (Microsoft Windows)":
            platformVar = "PC";
            break;
        
        case "iOS":
        case "Mac":
            platformVar = "Apple";
            break;
        case "Linux":
            platformVar = "Linux";
            break;
        
        case "Android":
            platformVar="Android";
            break;
        
        // PS Consoles
        case "PlayStation":
        case "PlayStation 2":
        case "PlayStation 3":
        case "PlayStation 4":
        case "PlayStation 5":
            platformVar = "PlayStation"
            break;
        
        // Xbox Consoles
        case "Xbox":
        case "Xbox 360":
        case "Xbox One":
        case "Xbox Series X|S":
            platformVar="Xbox";
            break;
        
        case "Wii":
            platformVar = "Wii";
            break;

        case "Wii U":
            platformVar="Wii U"
            break;
        
        case "Nintendo Switch":
            platformVar = "Nintendo Switch";
            break;
        
        // Everything unaccounted for
        default:
            platformVar = "404";
            break;
    }

    return platformVar;
}

export {getLogo};