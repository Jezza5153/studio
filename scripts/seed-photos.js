const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const photos = [
    { url: "https://lh3.googleusercontent.com/p/AF1QipN-ZlWqVYOFBRgEBr0GwWkAN_onn-zCUtLPe3V0=s1360-w1360-h1020-rw", name: "Mark de Vries", quote: "Fantastische sfeer en heerlijk eten!" },
    { url: "https://lh3.googleusercontent.com/p/AF1QipPvdPsyWg4z9o6EVaIq7oTP7BEDK1qgsEh-CoRj=s1360-w1360-h1020-rw", name: "Lisa Hendriks", quote: "De beste plek voor een avondje uit in Amersfoort" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerMSTvynqLfmQYpa8Kl_pWKwye8wp-1KOtLUv_xIwbNHJj0mko8kcNo36JTbMLcmlmu_0H807-55FDBq0Geg15aIiPeuQGeyxV3Z42hMsu2OagOGGwzCxBa9Mr5iQMLrjFu19E7WFXoo_eo=s1360-w1360-h1020-rw", name: "Peter Jansen", quote: "Elke keer weer verrast door de creativiteit" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepTIWO8WxoH0YAlEsRDFUQ0urHPcZ54nylR4Qm7GYLuaVRHPXTboq18TUaDXfn-NQ3CRIhcJVZlua5KbGI1d3r_ZaqMIIOu_cFLHZMqfKgnacRoVnkOxca6t02IVJ3j8cYQNB-9yvmNuAu9=s1360-w1360-h1020-rw", name: "Sophie van Dam", quote: "Geweldige gerechten met lokale ingrediënten" },
    { url: "https://lh3.googleusercontent.com/p/AF1QipMjsMxCK8GVze2YrEp5o6XUcfSw3sMm5nL1IQWB=s1360-w1360-h1020-rw", name: "Thomas Bakker", quote: "Een culinaire belevenis van begin tot eind" },
    { url: "https://lh3.googleusercontent.com/p/AF1QipNu5ThHUiVOXH8SpDx-gRpL9Sr4FtPSqEOvxXiL=s1360-w1360-h1020-rw", name: "Anna Visser", quote: "Warm ontvangst en prachtige presentatie" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwertHwZw6Fxk0KaKeQ3gt9aqxqEq2DpPJQcZT7hidXozgAitpotZ07xOyoXms1nCgu0rop5b9QxCiIgypdu8vs2iyD7ag2yqKH8o69Gz00bJKw5jOYAcY_3Z7L0jG39ywf20WRPJGFxySrx1=s1360-w1360-h1020-rw", name: "Eva Mulder", quote: "Smaken die je nergens anders vindt" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoiMCx5UyNcsa6m4S0fS9OUGE0tFIKlvDmfbEmpTwE3AoA5gIjvZbUM9AqtDFD5Om58-E1UrefSTz2xAz2pb9-ZjT3960z09CMETZrrX0EsAMeCwcSyJBzUvnKbPVC4Z8c8cD6dnBFgxTY=s1360-w1360-h1020-rw", name: "Hugo Vermeer", quote: "Top kwaliteit, eerlijk en seizoensgebonden" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepoMmAO7W4Hr05fE1xoGgmyv9Oqr-LAaxax9Tce3BV3MgZGufSNosNapYIfnd7Jn-4zJeuN5mv-UCxDXzq1DI3W2GTgpE66Ne97vptRxPgEaxKZpSC9YOiQI6yS1pC97T3_wsUeRpvXByB3=s1360-w1360-h1020-rw", name: "Fleur de Groot", quote: "Perfecte date-night plek" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweo3IFP6cj808fdCCFSMCwQVBg8EpkQaMKKSpsr2V9xUzQQnTl9Ba6ogt2mO3rXyBk1hO4JDylxW1HI5yVh1fTki7dZqJJRsqVIt8rf9ojshfqXUlhJiX6qBdTdYVpoZCn1zVAk1URfK9aPS=s1360-w1360-h1020-rw", name: "Ruben Smit", quote: "Van voorgerecht tot dessert, alles klopte" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer8DG3uTgF1AuV5TFPAk_vWI6pNd7BapcQhLGNMSk_3POuDr8NaU3zr0hzcghXnfw5qj62o48caN8K4jzTQD8HR9TPuoWPljsPWtZLfZpvtQr7Oi7NiBepUFijJG8oiT7ZNo910QvfyjB0=s1360-w1360-h1020-rw", name: "Mila Brouwer", quote: "De ambiance is ongeëvenaard" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweq3vrMkrCSm7zqbjQU_k7YWQC1TrcdSPcwj-zvKpSKMohMEC7lCOGsyIUWd1eWco-g22J0oiJDJOcY7IILozvFM3wOZoq0tFj3kRHxdZ9AalpP9V7ylOiGw6VOFFXdYO60V4sLuqIUwjvr4=s1360-w1360-h1020-rw", name: "Daan Willems", quote: "Echt vakmanschap op je bord" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepwGf8wW7XqViHPW5OebhO3CfN7nkLhPv6StOfikvBSAsOvrf2xSlGX3tqijM-aGuD_Xa5lri-X-HbfEpGF-t3wKSVa7SWQpsvJDxse7dkyzdziCfWg3OIWAFOdnPlFEAifi5VSUfaAZ54P=s1360-w1360-h1020-rw", name: "Lotte van Dijk", quote: "Verrassend lekker, zeker terugkomen" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqzhUIGJ2q4vAwhUwryRmIbFeexW_RGXAImtOexih4Fma4cSsqCkkHLysE1MDjU3HyWIHSQJRdcFYL-pb6jtlJtigvOQf_zHztPbDhZLwrR6vcpUYq2VTx06-uKEk3g4RKV0toiCkeN-ile=s1360-w1360-h1020-rw", name: "Jesse Bos", quote: "Bijzonder restaurant met een ziel" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweotXdS2gkefDQV9rxnMNpatTdHCB1V42e8MpiPp10sboCaXRrfvWGgi8t3yVACuVaQpKn6UWBKrR5C0jrsLFnHV4IjQnfy2j0YfAnV6UOX4nS13He6Llm54nMIG-6yg2NE4rS6SG16eFoz4=s1360-w1360-h1020-rw", name: "Noor Kuijpers", quote: "Iedere gang was een feestje" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqAizoltNSs9aXQchqHl0mPbpjNYglsvSyu4kZs863OrmsHUfqU7BQzAfxpkYzLrb_kVdsVVJxdlQMT8ylAmfIDjO9ZJZ-nkIYjNNUz94wHegFulcZCchdjE1cNDFSeaxtuKK9dmj4BsQ-o=s1360-w1360-h1020-rw", name: "Bram de Leeuw", quote: "Gezellig, lekker en betaalbaar" },
    { url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqr1igJVbjdhFMt7kxxfT-O8xMscmxdgKftGoHe5zD6_jfY7c69roOu27WMP7nTxqk5UT9JKS22AGAZ_avTDx9z7t8fn5aYs8s1-qoCF2Diob8vJIOlM3qTJXnY1uB0KZGUHspkIOgoTihU=s1360-w1360-h1020-rw", name: "Iris Martens", quote: "Voelde me meteen thuis" },
];

async function main() {
    await prisma.settings.update({
        where: { id: "singleton" },
        data: { googlePhotos: JSON.stringify(photos) },
    });
    console.log(`Updated googlePhotos with ${photos.length} customer photos`);
}

main().then(() => prisma.$disconnect());
