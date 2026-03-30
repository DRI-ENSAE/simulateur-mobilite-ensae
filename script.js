/* ============================================================
   SIMULATEUR MOBILITE ENSAE – SCRIPT.JS
   PARTIE 1 — NAVIGATION + LOGIQUE DES QUESTIONS
============================================================ */

/* ----- Utilitaires ----- */
function hideAll() {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
}

function goTo(id) {
    hideAll();
    document.getElementById(id).classList.add("active");
    window.scrollTo(0,0);
}

/* ============================================================
   Q2 → Q3 : condition boursier
============================================================ */
function toggleQ3() {
    const b = document.getElementById("boursier").value;
    if (b === "Oui") document.getElementById("q3").style.display = "block";
    else document.getElementById("q3").style.display = "none";
}

function nextFromQ2() {
    const b = document.getElementById("boursier").value;
    if (b === "") {
        alert("Merci de sélectionner une réponse.");
        return;
    }
    if (b === "Oui") goTo("q3");
    else goTo("q4");
}

/* ============================================================
   Détection stage
============================================================ */
function isStage() {
    const mob = document.getElementById("mobilite").value;
    return (
        mob === "Stage d'ouverture ENSAE" ||
        mob === "Stage d'application ENSAE" ||
        mob === "Stage de fin d'études ENSAE" ||
        mob === "Stage de fin d'études Master IP Paris & ENSAE" ||
        mob === "Stage de césure"
    );
}

function toggleStage() {
    if (!isStage()) {
        document.getElementById("q9").style.display = "none";
    } else {
        document.getElementById("q9").style.display = "block";
    }
}

/* ============================================================
   Q6 → Q7 : UE => Allemagne
============================================================ */
function toggleGermany() {
    const dest = document.getElementById("destination").value;

    if (dest === "Union Européenne") {
        document.getElementById("q7").style.display = "block";
    } else {
        document.getElementById("q7").style.display = "none";
        document.getElementById("q8").style.display = "none";
    }
}

function goNextFromQ6() {
    const dest = document.getElementById("destination").value;

    if (dest === "") {
        alert("Merci de sélectionner une destination.");
        return;
    }

    if (dest === "Union Européenne") goTo("q7");
    else {
        if (isStage()) goTo("q9");
        else goTo("q10");
    }
}

/* ============================================================
   Q7 → Q8 : Allemagne => Bavière
============================================================ */
function toggleBaviere() {
    const al = document.getElementById("allemagne").value;
    if (al === "Oui") document.getElementById("q8").style.display = "block";
    else document.getElementById("q8").style.display = "none";
}

function goNextFromQ7() {
    const al = document.getElementById("allemagne").value;

    if (al === "") {
        alert("Merci de sélectionner une réponse.");
        return;
    }

    if (al === "Oui") goTo("q8");
    else {
        if (isStage()) goTo("q9");
        else goTo("q10");
    }
}

/* ============================================================
   Q10 → résultats
============================================================ */
function computeResults() {
    if (document.getElementById("duree").value === "") {
        alert("Merci de sélectionner une durée.");
        return;
    }

    goTo("results");
    generateResults();
}/* ============================================================
   PARTIE 2 — SECTION I : BOURSES INTERNES (ENSAE / GENES)
============================================================ */

function generateSectionI() {

    const boursier = document.getElementById("boursier").value;
    const echelon = document.getElementById("echelon").value;
    const handicap = document.getElementById("handicap").value;
    const mob = document.getElementById("mobilite").value;
    const dest = document.getElementById("destination").value;
    const duree = document.getElementById("duree").value;

    let html = "";

    /* ---------------------------------------------------------
       SECTION I : BOURSES INTERNES
    --------------------------------------------------------- */
    html += `<h3>I. Bourses internes (ENSAE / Groupe ENSAE–ENSAI)</h3>`;

    /* ---------------------------------------------------------
       1. Erasmus+ échanges 3A
    --------------------------------------------------------- */
    if (
        mob === "Échange académique 3A" &&
        dest === "Union Européenne" &&
        duree !== "< 2 mois"
    ) {
        html += `
        <div class="result-block">
            <div class="aid-title">1. Bourses Erasmus+ échanges 3A</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Mobilité académique de 3A dans un établissement partenaire Erasmus+</li>
                <li>Durée ≥ 2 mois</li>
            </ul>

            <b>Conditions :</b>
            <ul>
                <li>Montant forfaitaire d’environ 500 €/mois</li>
                <li>Complément transport selon distance :
                    <ul>
                        <li>Transport écoresponsable : 285€ à 417€</li>
                        <li>Transport classique : 211€ à 309€</li>
                    </ul>
                </li>
                <li>Complément inclusion (+250€/mois) si :
                    <ul>
                        <li>Handicap ou ALD</li>
                        <li>Résidence en ZRR ou QPV</li>
                        <li>Boursier échelon 6 ou 7 (échelons 4–5 selon fonds)</li>
                    </ul>
                </li>
                <li>Versement 80% début – 20% fin</li>
            </ul>

            <b>Candidature :</b>
            <ul><li>Appel en avril</li></ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       2. Erasmus+ stages
    --------------------------------------------------------- */

    const isStageMobilite = (
        mob === "Stage d'ouverture ENSAE" ||
        mob === "Stage d'application ENSAE" ||
        mob === "Stage de fin d'études ENSAE" ||
        mob === "Stage de fin d'études Master IP Paris & ENSAE" ||
        mob === "Stage de césure"
    );

    if (
        isStageMobilite &&
        dest === "Union Européenne" &&
        duree !== "< 2 mois"
    ) {
        html += `
        <div class="result-block">
            <div class="aid-title">2. Bourses Erasmus+ stages</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Stage obligatoire ou stage de césure en Union Européenne</li>
                <li>Priorité :
                    <ul>
                        <li>Stages non rémunérés / faiblement rémunérés</li>
                        <li>Stages obligatoires</li>
                        <li>Structures partenaires (ex : StatCan, WFP…)</li>
                        <li>Boursiers sur critères sociaux</li>
                    </ul>
                </li>
            </ul>

            <b>Conditions :</b>
            <ul>
                <li>~500 €/mois</li>
                <li>+150 €/mois (complément stage)</li>
                <li>Complément transport (selon distance, bonus écoresponsable)</li>
                <li>Complément inclusion : +250 €/mois</li>
                <li>Paiement : 80% début / 20% fin</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Appel fin mars / début avril</li>
                <li>Appel complémentaire possible en décembre</li>
            </ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       3. Aide à la mobilité du GENES
    --------------------------------------------------------- */
    if (boursier === "Oui" && duree !== "< 2 mois") {
        html += `
        <div class="result-block">
            <div class="aid-title">3. Aide mobilité internationale — GENES</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Boursier sur critères sociaux</li>
                <li>Mobilité de 2 à 9 mois</li>
                <li>Mobilité confirmée au moment de l’appel</li>
                <li>Mobilités académiques prioritaires</li>
            </ul>

            <b>Conditions :</b>
            <ul>
                <li>4 bourses/an</li>
                <li>400 €/mois</li>
                <li>Cumulable avec d’autres aides</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>1 à 2 appels / an</li>
                <li>Rétroactivité possible</li>
            </ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       4. Fondation ENSAE–ENSAI
    --------------------------------------------------------- */
    if (boursier === "Oui") {
        html += `
        <div class="result-block">
            <div class="aid-title">4. Aide Fondation ENSAE–ENSAI</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Boursier sur critères sociaux</li>
                <li>Mobilité d’études ou de stage</li>
            </ul>

            <b>Montant :</b>
            <ul>
                <li>1 000 €</li>
                <li>Jusqu’à 5 aides / an</li>
            </ul>

            <b>Candidature :</b>
            <ul><li>Attribuée par la DRI</li></ul>
        </div>`;
    }

    window._resultHTML = html;
}
``/* ============================================================
   PARTIE 3 — SECTION II : BOURSES SPÉCIFIQUES & EXTERNES
============================================================ */

function generateSectionII() {

    const boursier = document.getElementById("boursier").value;
    const handicap = document.getElementById("handicap").value;
    const mob = document.getElementById("mobilite").value;
    const dest = document.getElementById("destination").value;
    const alle = document.getElementById("allemagne").value;
    const bav = document.getElementById("baviere").value;
    const remun = document.getElementById("remuneration").value;
    const duree = document.getElementById("duree").value;

    let html = window._resultHTML;

    /* ---------------------------------------------------------
       5. IP Paris – Bourse de stage Erasmus+ Master
    --------------------------------------------------------- */
    if (
        mob === "Stage de fin d'études Master IP Paris & ENSAE" &&
        dest === "Union Européenne" &&
        duree !== "< 2 mois"
    ) {
        html += `
        <div class="result-block">
            <div class="aid-title">5. IP Paris – Bourse de stage Erasmus+ Master</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Élèves ENSAE inscrits en Master IP Paris</li>
                <li>Stage de 2 à 6 mois en Union Européenne</li>
                <li>Priorité aux stages non rémunérés</li>
                <li>Non cumulable avec Erasmus+ ENSAE</li>
            </ul>

            <b>Candidature :</b>
            <ul><li>Gestion via IP Paris</li></ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       6. Zellidja — Académie Française
    --------------------------------------------------------- */
    if (
        mob === "Scolarité extérieure diplômante (Scolex)" ||
        mob === "Échange académique césure" ||
        mob === "Stage de césure"
    ) {
        html += `
        <div class="result-block">
            <div class="aid-title">6. Bourse Jean Walter–Zellidja</div>

            <b>Pour :</b>
            <ul>
                <li>Projet académique ou de recherche ≥ 2 mois</li>
                <li>Moins de 30 ans</li>
                <li>Départ à partir de juillet</li>
                <li>2 dossiers admissibles par ENSAE chaque année</li>
            </ul>

            <b>Montant :</b>
            <ul>
                <li>800€ à 5 000€</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Novembre → février</li>
                <li>Dossier papier via la DRI</li>
            </ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       7. CGE — Mobilité handicap
    --------------------------------------------------------- */
    if (handicap === "Oui") {
        html += `
        <div class="result-block">
            <div class="aid-title">7. Bourse Handicap — Conférence des Grandes Écoles (CGE)</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Handicap ou ALD (justificatif obligatoire)</li>
                <li>Mobilité confirmée et à venir</li>
            </ul>

            <b>Montant :</b>
            <ul><li>150€ à 5 000€</li></ul>

            <b>Candidature :</b>
            <ul><li>Via la DRI — deadline début mai</li></ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       8. OFAJ — Allemagne
    --------------------------------------------------------- */
    const isStageMobilite =
        mob === "Stage d'ouverture ENSAE" ||
        mob === "Stage d'application ENSAE" ||
        mob === "Stage de fin d'études ENSAE" ||
        mob === "Stage de fin d'études Master IP Paris & ENSAE" ||
        mob === "Stage de césure";

    if (
        alle === "Oui" &&
        isStageMobilite &&
        remun !== "> 1200€ /mois"
    ) {
        html += `
        <div class="result-block">
            <div class="aid-title">8. OFAJ – Stage en Allemagne</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Stage obligatoire</li>
                <li>Durée ≥ 1 mois</li>
                <li>Non éligible si rémunération >1200€</li>
            </ul>

            <b>Montant :</b>
            <ul>
                <li>300€/mois max (3 mois)</li>
                <li>0,16€/km (transport)</li>
            </ul>

            <b>Candidature :</b>
            <ul><li>Via la DRI</li></ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       9. BayFrance — Bavière
    --------------------------------------------------------- */
    if (bav === "Oui") {
        html += `
        <div class="result-block">
            <div class="aid-title">9. BayFrance — Starter-Kit Bayern–France</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Études ou stage de recherche en Bavière</li>
                <li>Stages en entreprise inéligibles</li>
            </ul>

            <b>Montant :</b>
            <ul>
                <li>500€ + 450€ transport</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>15 novembre (mobilité été)</li>
                <li>15 avril (mobilité hiver)</li>
            </ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       10. GREAT — Royaume-Uni
    --------------------------------------------------------- */
    if (
        mob === "Scolarité extérieure diplômante (Scolex)" &&
        dest === "Royaume-Uni"
    ) {
        html += `
        <div class="result-block">
            <div class="aid-title">10. Bourses GREAT – Royaume-Uni</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Master d’un an dans les universités partenaires</li>
            </ul>

            <b>Montant :</b>
            <ul><li>≥ £10 000</li></ul>

            <b>Candidature :</b>
            <ul><li>Directement auprès des universités</li></ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       11. Fulbright — États-Unis
    --------------------------------------------------------- */
    if (
        mob === "Scolarité extérieure diplômante (Scolex)" &&
        dest === "États-Unis"
    ) {
        html += `
        <div class="result-block">
            <div class="aid-title">11. Bourses Fulbright – États-Unis</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Master ou PhD</li>
                <li>Nationalité française</li>
            </ul>

            <b>Montant :</b>
            <ul>
                <li>40 000$</li>
                <li>1200€ transport</li>
                <li>Assurance + visa gratuit</li>
            </ul>

            <b>Candidature :</b>
            <ul><li>Deadline : 1er décembre</li></ul>
        </div>`;
    }

    window._resultHTML = html;
}/* ============================================================
   PARTIE 4 — SECTION III + SECTION IV + FINALISATION
============================================================ */

function generateSectionIII_IV() {

    let html = window._resultHTML;

    /* ---------------------------------------------------------
       III. Aides non éligibles ENSAE
    --------------------------------------------------------- */
    html += `
    <h3>III. Aides non éligibles pour les élèves ENSAE</h3>

    <div class="result-block">
        <ul>
            <li>❌ Aide à la mobilité internationale (AMI – MESRI) :
                non accessible aux écoles du Ministère de l’Économie.
            </li>
            <li>❌ Bourse Mobilité Île-de-France :
                non accessible aux écoles d’ingénieur.
            </li>
        </ul>
    </div>
    `;

    /* ---------------------------------------------------------
       IV. Contacts & rappels
    --------------------------------------------------------- */
    html += `
    <h3>IV. Contacts & rappels</h3>

    <div class="result-block">
        <p>
            📧 <b>international@ensae.fr</b><br><br>

            Merci d’indiquer l’objet de votre demande et vos dates de mobilité.<br>
            En cas de candidature à une aide externe (OFAJ, BayFrance, Fulbright, Zellidja, etc.),
            merci d'informer la DRI lors du dépôt du dossier et en cas d'attribution.
        </p>
    </div>
    `;

    document.getElementById("result-content").innerHTML = html;
}

/* ============================================================
   FINAL — Appel principal
============================================================ */

function generateResults() {
    generateSectionI();      // Partie I
    generateSectionII();     // Partie II
    generateSectionIII_IV(); // Partie III + IV
}
