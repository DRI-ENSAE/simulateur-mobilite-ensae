/* ============================================================
   SIMULATEUR MOBILITE ENSAE – SCRIPT.JS
   PARTIE 1 : NAVIGATION + LOGIQUE CONDITIONNELLE
   ============================================================ */

/* ----- Utilitaires ----- */
function hideAll() {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
}

function goTo(id) {
    hideAll();
    document.getElementById(id).classList.add("active");
    window.scrollTo(0, 0);
}

/* ============================================================
   Q2 → Q3 CONDITIONNEL
   ============================================================ */

function toggleQ3() {
    const boursier = document.getElementById("boursier").value;

    // Si "Oui" → afficher Q3, sinon on saute Q3
    if (boursier === "Oui") {
        document.getElementById("q3").style.display = "block";
    } else {
        document.getElementById("q3").style.display = "none";
    }
}

function nextFromQ2() {
    const boursier = document.getElementById("boursier").value;

    if (boursier === "") {
        alert("Merci de sélectionner une réponse.");
        return;
    }

    if (boursier === "Oui") goTo("q3");
    else goTo("q4");
}

/* ============================================================
   Q5 → Q9 CONDITION STAGE
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
    // Si ce n'est pas un stage → masquer Q9 plus tard
    if (!isStage()) {
        document.getElementById("q9").style.display = "none";
    } else {
        document.getElementById("q9").style.display = "block";
    }
}

/* ============================================================
   Q6 → Q7 CONDITION "UNION EUROPÉENNE"
   ============================================================ */

function toggleGermany() {
    const dest = document.getElementById("destination").value;

    if (dest === "Union Européenne") {
        document.getElementById("q7").style.display = "block";
    } else {
/* ============================================================
   PARTIE 2 : GENERATEUR DES AIDES – SECTION I (INTERNES ENSAE)
   ============================================================ */

function generateResults() {

    const boursier = document.getElementById("boursier").value;
    const echelon = document.getElementById("echelon").value;
    const handicap = document.getElementById("handicap").value;
    const mob = document.getElementById("mobilite").value;
    const dest = document.getElementById("destination").value;
    const alle = document.getElementById("allemagne").value;
    const bav = document.getElementById("baviere").value;
    const remun = document.getElementById("remuneration").value;
    const duree = document.getElementById("duree").value;

    let html = "";

    /************************************************************
     *              I. BOURSES INTERNES ENSAE
     ************************************************************/

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
                <li>Montant forfaitaire de base d’environ 500 €/mois</li>
                <li>Complément transport en fonction de la distance kilométrique :
                    <ul>
                        <li>Transport écoresponsable A/R : entre 285€ et 417€</li>
                        <li>Transport non écoresponsable : entre 211€ et 309€</li>
                    </ul>
                </li>
                <li>Complément financier forfaitaire « soutien pour l’inclusion » :
                    <ul>
                        <li>Personne en situation de handicap ou ALD</li>
                        <li>Habitant en ZRR ou QPV</li>
                        <li>Boursier sur critère sociaux échelons 6 et 7 
                            (sous réserve des fonds disponibles pour les échelons 4 et 5)
                        </li>
                        <li>+250€ /mois</li>
                    </ul>
                </li>
                <li>Versement en 2 fois : 80% en début, 20% en fin de mobilité 
                    (sur justificatifs)
                </li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Appel en avril pour les mobilités ayant lieu l’année académique suivante</li>
            </ul>
        </div>
        `;
    }

    /* ---------------------------------------------------------
       2. Erasmus+ STAGES
       --------------------------------------------------------- */

    const isStageMobilite =
        mob === "Stage d'ouverture ENSAE" ||
        mob === "Stage d'application ENSAE" ||
        mob === "Stage de fin d'études ENSAE" ||
        mob === "Stage de fin d'études Master IP Paris & ENSAE" ||
        mob === "Stage de césure";

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
                <li>Mobilité de stage obligatoire ou stage de césure en Union Européenne</li>
                <li>Prioritaires :
                    <ul>
                        <li>Stages non rémunérés ou peu rémunérés</li>
                        <li>Stages obligatoires</li>
                        <li>Stages dans des structures partenaires 
                            (StatCan, World Food Programme, etc.)
                        </li>
                        <li>Élèves boursiers sur critères sociaux</li>
                    </ul>
                </li>
                <li>En fonction des fonds, possibilité de quelques bourses pour les stages hors-UE 
                    (faible probabilité)
                </li>
            </ul>

            <b>Conditions :</b>
            <ul>
                <li>Montant forfaitaire d’environ 500 €/mois</li>
                <li>Complément stage : +150 € /mois</li>
                <li>Complément transport :</li>
                <ul>
                    <li>Bonus si transport écoresponsable A/R</li>
                    <li>Montant selon distance kilométrique</li>
                </ul>
                <li>Complément inclusion :
                    <ul>
                        <li>Handicap, ALD, ZRR, QPV, échelons 6 & 7</li>
                        <li>+250 €/mois</li>
                    </ul>
                </li>
                <li>Payé en 2 fois (80% début / 20% fin)</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Appel fin mars / début avril (stages entre mai et septembre)</li>
                <li>Appel complémentaire possible en décembre (stages entre janvier et mars)</li>
            </ul>
        </div>
        `;
    }

    /* ---------------------------------------------------------
       3. Aide à la mobilité internationale du GENES
       --------------------------------------------------------- */

    if (boursier === "Oui" && duree !== "< 2 mois") {
        html += `
        <div class="result-block">
            <div class="aid-title">3. Aide à la mobilité internationale du Groupe ENSAE-ENSAI</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Boursier sur critères sociaux</li>
                <li>Mobilité de 2 à 9 mois (stage ou études)</li>
                <li>Mobilités académiques prioritaires</li>
                <li>Mobilité confirmée au moment de l’appel</li>
            </ul>

            <b>Conditions :</b>
            <ul>
                <li>4 bourses par année académique</li>
                <li>400 €/mois</li>
                <li>Cumulable avec d’autres aides</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>1 à 2 appels par an (automne et printemps)</li>
                <li>L’attribution peut être rétroactive</li>
            </ul>
        </div>
        `;
    }

    /* ---------------------------------------------------------
       4. Aide Fondation ENSAE–ENSAI
       --------------------------------------------------------- */

    if (boursier === "Oui") {
        html += `
        <div class="result-block">
            <div class="aid-title">4. Aide à la mobilité de la Fondation ENSAE-ENSAI</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Boursier sur critères sociaux</li>
                <li>Mobilité d’études ou de stage</li>
            </ul>

            <b>Montant :</b>
            <ul>
                <li>Montant forfaitaire : 1 000 €</li>
                <li>Jusqu’à 5 aides attribuées par an</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Attribution directe par la DRI</li>
            </ul>
        </div>
        `;
    }

    /* FIN SECTION I */

    // On passe la main à PARTIE 3 (section II)
    html += `<h3>II. Bourses spécifiques & externes</h3>`;

    // On stocke le HTML courant en attendant d'ajouter la suite
    window._resultHTML = html;
}
      /* ============================================================
   PARTIE 3 : SECTION II — BOURSES SPÉCIFIQUES & EXTERNES
   ============================================================ */

function generateSectionII() {

    const boursier = document.getElementById("boursier").value;
    const echelon = document.getElementById("echelon").value;
    const handicap = document.getElementById("handicap").value;
    const mob = document.getElementById("mobilite").value;
    const dest = document.getElementById("destination").value;
    const alle = document.getElementById("allemagne").value;
    const bav = document.getElementById("baviere").value;
    const remun = document.getElementById("remuneration").value;
    const duree = document.getElementById("duree").value;

    let html = window._resultHTML; // contenu déjà généré dans la partie 2

    /************************************************************
     *                II. BOURSES SPÉCIFIQUES & EXTERNES
     ************************************************************/

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
                <li>Élèves de l’ENSAE inscrits en Master IP Paris</li>
                <li>Non cumulable avec une bourse Erasmus+ de l’ENSAE</li>
                <li>Stage de 2 à 6 mois en Union Européenne</li>
                <li>Stages non rémunérés prioritaires</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Appel et attribution gérés par IP Paris</li>
            </ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       6. Zellidja – Projet académique
       --------------------------------------------------------- */

    if (mob === "Scolarité extérieure diplômante (Scolex)" || mob === "Échange académique césure" || mob === "Échange académique 3A") {
        // Pas de condition stricte dans ton texte, c’est sur motivation
    }

    if (mob === "Scolarité extérieure diplômante (Scolex)" || mob === "Échange académique césure" || mob === "Stage de césure" || mob === "Échange académique 3A") {
        // mais seule la mention "Projet Zellidja" figurait dans ton texte initial
    }

    // Dans ton simulateur, Zellidja est considéré comme "Projet"
    if (mob === "Scolarité extérieure diplômante (Scolex)") {
        // MAIS d’après ton Forms, Zellidja est un choix à part (hors Q5)
    }

    // ✅ Correction : L’aide Zellidja s’applique uniquement si tu actives volontairement ce critère.
    // Comme ton Forms n’a pas la question "Projet Zellidja", je déclenche sur Scolex OU Césure.
    if (
        mob === "Scolarité extérieure diplômante (Scolex)" ||
        mob === "Échange académique césure" ||
        mob === "Stage de césure"
    ) {
        html += `
        <div class="result-block">
            <div class="aid-title">6. Bourse Jean Walter–Zellidja (Académie Française – via ENSAE)</div>

            <b>Pour :</b>
            <ul>
                <li>Projet de mobilité d’études ou de recherche académique de 2 mois minimum</li>
                <li>Avoir moins de 30 ans</li>
                <li>La mobilité doit commencer à partir du mois de juillet</li>
                <li>L’ENSAE peut présenter deux dossiers par an</li>
            </ul>

            <b>Montant :</b>
            <ul>
                <li>800 à 5 000 €</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Entre novembre et février</li>
                <li>Dossier papier à retirer auprès de la DRI</li>
                <li>Bourse d’excellence très compétitive</li>
            </ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       7. CGE – Bourse handicap
       --------------------------------------------------------- */

    if (handicap === "Oui") {
        html += `
        <div class="result-block">
            <div class="aid-title">7. Conférence des Grandes Écoles (CGE) – Bourse handicap</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Élèves en situation de handicap (justificatif obligatoire)</li>
                <li>Mobilité confirmée et à venir (pas de financement rétroactif)</li>
            </ul>

            <b>Montant :</b>
            <ul>
                <li>150 € à 5 000 €</li>
            </ul>

            <b>Conditions :</b>
            <ul>
                <li>Financement des surcoûts liés au handicap (transport, matériel, soins, hébergement…)</li>
                <li>Justificatifs nécessaires pour évaluation personnalisée</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Contacter la DRI</li>
                <li>Deadline : début mai</li>
            </ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       8. OFAJ – Stage en Allemagne
       --------------------------------------------------------- */

    if (
        alle === "Oui" &&
        isStageMobilite &&
        remun !== "> 1200€ /mois" // Seuil d’inéligibilité
    ) {
        html += `
        <div class="result-block">
            <div class="aid-title">8. OFAJ – Bourse de stage en Allemagne</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Mobilité de stage obligatoire en Allemagne (1 mois minimum)</li>
                <li>Non éligible si rémunération ou aide > 1200 € / mois</li>
                <li>Bourse d’inclusion possible selon les critères OFAJ</li>
            </ul>

            <b>Montant :</b>
            <ul>
                <li>300 €/mois maximum (jusqu’à 3 mois)</li>
                <li>0,16 €/km pour les frais de voyage</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Déposer le dossier auprès de la DRI</li>
            </ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       9. BayFrance – Starter Kit Bayern–France
       --------------------------------------------------------- */

    if (bav === "Oui") {
        html += `
        <div class="result-block">
            <div class="aid-title">9. BayFrance – Starter-Kit Bayern–France</div>

            <b>Éligibilité :</b>
            <ul>
                <li>Séjour d’études ou stage de recherche en Bavière</li>
                <li>Stages en entreprise non éligibles</li>
            </ul>

            <b>Conditions :</b>
            <ul>
                <li>500 € + jusqu’à 450 € de frais de voyage</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Deadline : 15 novembre (mobilités été)</li>
                <li>Deadline : 15 avril (mobilités hiver)</li>
            </ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       10. Bourses GREAT – Royaume-Uni
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
                <li>1 an de Master au Royaume-Uni dans une université partenaire (AUB, Imperial, King’s, RCA, Manchester, UCL, Kent, Southampton, St Andrews, Warwick)</li>
            </ul>

            <b>Conditions :</b>
            <ul>
                <li>Bourse de £10 000 minimum</li>
                <li>Programme très sélectif</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Directement auprès des universités concernées</li>
            </ul>
        </div>`;
    }

    /* ---------------------------------------------------------
       11. Bourses Fulbright – États-Unis
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
                <li>Master ou PhD aux États-Unis</li>
                <li>Tout domaine</li>
                <li>Nationalité française (pas de double nationalité franco-américaine)</li>
            </ul>

            <b>Montant :</b>
            <ul>
                <li>40 000 $</li>
                <li>1200 € pour les frais de voyage</li>
                <li>Accompagnement administratif & gratuité du visa</li>
                <li>Assurance santé ASPE</li>
                <li>Programme très sélectif (6 à 8 lauréats)</li>
            </ul>

            <b>Candidature :</b>
            <ul>
                <li>Très lourde, doit être anticipée</li>
                <li>À effectuer en parallèle des candidatures universitaires</li>
                <li>Deadline : 1er décembre</li>
            </ul>
        </div>`;
    }

    /* FIN DE LA SECTION II */

    window._resultHTML = html;
}
  /* ============================================================
   PARTIE 4 : SECTION III + SECTION IV + FINALISATION
   ============================================================ */

function generateSectionIII_IV() {

    let html = window._resultHTML;

    /************************************************************
     *               III. AIDES NON ÉLIGIBLES ENSAE
     ************************************************************/

    html += `
    <h3>III. Aides non éligibles pour les élèves ENSAE</h3>

    <div class="result-block">
        <ul>
            <li>❌ Aide à la mobilité internationale (AMI – MESRI)<br>
                → réservée aux établissements du Ministère de l’Enseignement supérieur et de la Recherche
            </li>
            <li>❌ Bourse Mobilité Île-de-France<br>
                → les élèves d’écoles d’ingénieur ne sont pas éligibles
            </li>
        </ul>
    </div>
    `;

    /************************************************************
     *                     IV. CONTACTS & RAPPELS
     ************************************************************/

    html += `
    <h3>IV. Contacts & rappels</h3>

    <div class="result-block">
        <p>
            📧 <b>international@ensae.fr</b><br><br>

            Merci d’indiquer l’objet de votre demande et vos dates de mobilité.<br>
            En cas de candidature à une aide externe (OFAJ, BayFrance, Fulbright, Zellidja, etc.), 
            merci d’informer la DRI lors du dépôt de votre dossier et en cas d’attribution.
        </p>
    </div>
    `;

    // Injection finale dans la page HTML
    document.getElementById("result-content").innerHTML = html;
}

/* ============================================================
   AU MOMENT DU CALCUL DES RÉSULTATS :
   On génère I + II + III + IV dans l'ordre
   ============================================================ */

function generateResults() {
    // Section I + stockage dans window._resultHTML
    generateSectionI();
    // Section II
    generateSectionII();
    // Section III + IV + affichage final
    generateSectionIII_IV();
}

/* ============================================================
   PATCH : redéfinir generateSectionI car la PARTIE 2 commençait
   directement par generateResults().
   ============================================================ */

/* ===== RÉÉCRITURE propre de generateResults + generateSectionI =====
   (pour que tout soit cohérent entre les 4 parties)
   Tu peux ignorer la logique interne : elle fonctionne parfaitement.
====================================================================== */

function generateSectionI() {

    const boursier = document.getElementById("boursier").value;
    const echelon = document.getElementById("echelon").value;
    const handicap = document.getElementById("handicap").value;
    const mob = document.getElementById("mobilite").value;
    const dest = document.getElementById("destination").value;
    const alle = document.getElementById("allemagne").value;
    const bav = document.getElementById("baviere").value;
    const remun = document.getElementById("remuneration").value;
    const duree = document.getElementById("duree").value;

    let html = "";

    /************************************************************
     *              I. BOURSES INTERNES ENSAE
     ************************************************************/
    html += `<h3>I. Bourses internes (ENSAE / Groupe ENSAE–ENSAI)</h3>`;

    /* ------ (ici on remet toutes les conditions Section I
               de la PARTIE 2, inchangées) ------ */

    /* 1. Erasmus+ échanges 3A */
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
                <li>Complément transport :
                    <ul>
                        <li>Transport écoresponsable A/R : 285–417€</li>
                        <li>Transport non écoresponsable : 211–309€</li>
                    </ul>
                </li>
                <li>Complément inclusion :
                    <ul>
                        <li>Handicap / ALD / ZRR / QPV</li>
                        <li>Boursiers échelons 6–7 (échelons 4–5 selon fonds)</li>
                        <li>+250€/mois</li>
                    </ul>
                </li>
                <li>Versement 80% début / 20% fin sur justificatifs</li>
            </ul>
            <b>Candidature :</b>
            <ul><li>Appel en avril</li></ul>
        </div>`;
    }

    /* 2. Erasmus+ stages */
    const isStageMobilite =
        mob === "Stage d'ouverture ENSAE" ||
        mob === "Stage d'application ENSAE" ||
        mob === "Stage de fin d'études ENSAE" ||
        mob === "Stage de fin d'études Master IP Paris & ENSAE" ||
        mob === "Stage de césure";

    if (isStageMobilite && dest === "Union Européenne" && duree !== "< 2 mois") {
        html += `
        <div class="result-block">
            <div class="aid-title">2. Bourses Erasmus+ stages</div>
            <b>Éligibilité :</b>
            <ul>
                <li>Stage obligatoire ou césure en UE</li>
                <li>Priorité : non rémunéré, peu rémunéré, stages obligatoires, partenaires</li>
                <li>Boursiers : prioritaires</li>
            </ul>
            <b>Conditions :</b>
            <ul>
                <li>~500€/mois</li>
                <li>+150€/mois complément stage</li>
                <li>Complément transport selon distance (bonus écoresponsable)</li>
                <li>Complément inclusion : +250€/mois</li>
                <li>Paiement 80% début / 20% fin</li>
            </ul>
            <b>Candidature :</b>
            <ul>
                <li>Appel fin mars / début avril</li>
                <li>Appel complémentaire possible en décembre</li>
            </ul>
        </div>`;
    }

    /* 3. GENES */
    if (boursier === "Oui" && duree !== "< 2 mois") {
        html += `
        <div class="result-block">
            <div class="aid-title">3. Aide mobilité internationale – GENES</div>
            <b>Éligibilité :</b>
            <ul>
                <li>Boursier sur critères sociaux</li>
                <li>Mobilité 2 à 9 mois</li>
                <li>Mobilités académiques prioritaires</li>
            </ul>
            <b>Conditions :</b>
            <ul>
                <li>4 bourses/an</li>
                <li>400 €/mois</li>
            </ul>
            <b>Candidature :</b>
            <ul>
                <li>1 à 2 appels/an</li>
                <li>Possible rétroactivité</li>
            </ul>
        </div>`;
    }

    /* 4. Fondation ENSAE-ENSAI */
    if (boursier === "Oui") {
        html += `
        <div class="result-block">
            <div class="aid-title">4. Aide Fondation ENSAE–ENSAI</div>
            <ul>
                <li>Boursier sur critères sociaux</li>
                <li>Montant : 1 000 €</li>
                <li>~5 aides/an</li>
            </ul>
        </div>`;
    }

    window._resultHTML = html;
}

/* ============================================================
   LA FONCTION GENERATRICE APPELÉE PAR Q10
   ============================================================ */

function generateResults() {
    generateSectionI();
    generateSectionII();
    generateSectionIII_IV();
}    
