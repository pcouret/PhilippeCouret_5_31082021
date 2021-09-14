class Utils {
    static normString(scriptToNorm){
        return (scriptToNorm.toLowerCase()).normalize("NFD").replace(/\p{Diacritic}/gu, "")
    }
}