class Utils {
    static normScripture(scriptToNorm){
        return (scriptToNorm.toLowerCase()).normalize("NFD").replace(/\p{Diacritic}/gu, "")
    }
}