/**
 * Aggregator for all per-event narration cue files.
 *
 * Each event's cue list lives in its own `{event-id}.ts` next to this
 * index. `loadEventCues()` registers them all in one shot via
 * `registerEventCues` from the narration cue dispatcher.
 *
 * Call after `initNarrationCues()` once per page load.
 */
import { registerEventCues } from '../narrationCues';

// Primordial era
import nacimientoAdanEva from './nacimiento-adan-eva';
import expulsionEden from './expulsion-eden';
import nacimientoCain from './nacimiento-cain';
import nacimientoAbel from './nacimiento-abel';
import nacimientoSet from './nacimiento-set';
import cainMataAbel from './cain-mata-abel';
import nacimientoEnoc from './nacimiento-enoc';
import asuncionEnoc from './asuncion-enoc';
import nacimientoNoe from './nacimiento-noe';
import ordenConstruirArca from './orden-construir-arca';
import diluvio from './diluvio';
import torreDeBabel from './torre-de-babel';

// Patriarcal era
import nacimientoAbraham from './nacimiento-abraham';
import abrahamRompeIdolos from './abraham-rompe-idolos';
import llamadoDeAbraham from './llamado-de-abraham';
import pactoDeAbraham from './pacto-de-abraham';
import nacimientoIsmael from './nacimiento-ismael';
import destruccionSodomaGomorra from './destruccion-sodoma-gomorra';
import nacimientoIsaac from './nacimiento-isaac';
import akedahSacrificioIsaac from './akedah-sacrificio-isaac';
import muerteSara from './muerte-sara';
import nacimientoJacobEsau from './nacimiento-jacob-esau';
import jacobRobaPrimogenitura from './jacob-roba-primogenitura';
import escaleraDeJacob from './escalera-de-jacob';
import jacobLuchaConAngel from './jacob-lucha-con-angel';
import joseVendidoPorHermanos from './jose-vendido-por-hermanos';
import joseEnEgipto from './jose-en-egipto';
import reencuentroJoseHermanos from './reencuentro-jose-hermanos';
import muerteDeJacob from './muerte-de-jacob';
import muerteDeJose from './muerte-de-jose';

// Éxodo era
import esclavitudEnEgipto from './esclavitud-en-egipto';
import nacimientoMoises from './nacimiento-moises';
import moisesMataEgipcio from './moises-mata-egipcio';
import zarzaArdiente from './zarza-ardiente';
import moisesConfrontaFaraon from './moises-confronta-faraon';
import diezPlagas from './diez-plagas';
import pesajPrimeraPascua from './pesaj-primera-pascua';
import salidaDeEgipto from './salida-de-egipto';
import cruceDelMarRojo from './cruce-del-mar-rojo';
import manaYCodornices from './mana-y-codornices';
import aguaDeLaRoca from './agua-de-la-roca';
import diezMandamientos from './diez-mandamientos';
import becerroDeOro from './becerro-de-oro';
import tabernaculo from './tabernaculo';
import doceEspias from './doce-espias';
import rebelionCore from './rebelion-core';
import moisesGolpeaRocaSegundaVez from './moises-golpea-roca-segunda-vez';
import serpienteDeBronce from './serpiente-de-bronce';
import muerteDeAaron from './muerte-de-aaron';
import muerteDeMoises from './muerte-de-moises';

// Reinos y Exilio era
import conquistaJerico from './conquista-jerico';
import conquistaCanaan from './conquista-canaan';
import periodoJueces from './periodo-jueces';
import deboraProfetisa from './debora-profetisa';
import gedeon from './gedeon';
import sanson from './sanson';
import samuelUltimoJuez from './samuel-ultimo-juez';
import reinadoSaul from './reinado-saul';
import davidVsGoliat from './david-vs-goliat';
import davidRey from './david-rey';
import batsabeYNatan from './batsabe-y-natan';
import rebelionDeAbsalon from './rebelion-de-absalon';
import salomonRey from './salomon-rey';
import templeDeSalomon from './templo-de-salomon';
import reinaDeSaba from './reina-de-saba';
import divisionDelReino from './division-del-reino';
import eliasYBaal from './elias-y-baal';
import ascensoElias from './ascenso-elias';
import profetasMayores from './profetas-mayores';
import exilioBabilonico from './exilio-babilonico';
import danielEnBabilonia from './daniel-en-babilonia';
import regresoDelExilio from './regreso-del-exilio';

// Evangelio era
import anunciacion from './anunciacion';
import visitacionIsabel from './visitacion-isabel';
import nacimientoJuanBautista from './nacimiento-juan-bautista';
import nacimientoJesus from './nacimiento-jesus';
import presentacionEnElTemplo from './presentacion-en-el-templo';
import huidaAEgipto from './huida-a-egipto';
import jesusEnElTemplo12Anos from './jesus-en-el-templo-12-anos';
import bautismoDeJesus from './bautismo-de-jesus';
import tentacionesDesierto from './tentaciones-desierto';
import eleccionDoceApostoles from './eleccion-doce-apostoles';
import sermonDelMonte from './sermon-del-monte';
import milagrosDeJesus from './milagros-de-jesus';
import transfiguracion from './transfiguracion';
import entradaTriunfalJerusalen from './entrada-triunfal-jerusalen';
import ultimaCena from './ultima-cena';
import getsemani from './getsemani';
import juiciosJesus from './juicios-jesus';
import crucifixion from './crucifixion';
import resurreccion from './resurreccion';
import ascension from './ascension';
import pentecostes from './pentecostes';
import martirioEsteban from './martirio-esteban';
import conversionDePablo from './conversion-de-pablo';
import viajesMisionerosPablo from './viajes-misioneros-pablo';
import muertePedroPablo from './muerte-pedro-pablo';

// Revelación era (Islamic)
import nacimientoMahoma from './nacimiento-mahoma';
import infanciaAminaYHalima from './infancia-amina-y-halima';
import muerteDeAmina from './muerte-de-amina';
import muerteDeAbdulmuttalib from './muerte-de-abdulmuttalib';
import viajeConAbuTalibBahira from './viaje-con-abu-talib-bahira';
import matrimonioConKhadija from './matrimonio-con-khadija';
import revelacionEnHira from './revelacion-en-hira';
import predicacionSecreta from './predicacion-secreta';
import predicacionPublica from './predicacion-publica';
import migracionAAbisinia from './migracion-a-abisinia';
import boicotDeQuraysh from './boicot-de-quraysh';
import anoDeTristeza from './ano-de-tristeza';
import viajeNocturnoMiRaj from './viaje-nocturno-mi-raj';
import conversionDeMedinaAnsar from './conversion-de-medina-ansar';
import hegiraMigracionAMedina from './hegira-migracion-a-medina';
import fundacionComunidadMedina from './fundacion-comunidad-medina';
import batallaDeBadr from './batalla-de-badr';
import batallaDeUhud from './batalla-de-uhud';
import batallaDelFoso from './batalla-del-foso';
import tratadoDeHudaibiya from './tratado-de-hudaibiya';
import conquistaDeMeca from './conquista-de-meca';
import peregrinacionDeDespedida from './peregrinacion-de-despedida';
import muerteDeMahoma from './muerte-de-mahoma';

let loaded = false;

/**
 * Register every event's cues with the dispatcher. Idempotent.
 */
export function loadEventCues(): void {
  if (loaded) return;
  loaded = true;

  // Primordial era
  registerEventCues('nacimiento-adan-eva', nacimientoAdanEva);
  registerEventCues('expulsion-eden', expulsionEden);
  registerEventCues('nacimiento-cain', nacimientoCain);
  registerEventCues('nacimiento-abel', nacimientoAbel);
  registerEventCues('nacimiento-set', nacimientoSet);
  registerEventCues('cain-mata-abel', cainMataAbel);
  registerEventCues('nacimiento-enoc', nacimientoEnoc);
  registerEventCues('asuncion-enoc', asuncionEnoc);
  registerEventCues('nacimiento-noe', nacimientoNoe);
  registerEventCues('orden-construir-arca', ordenConstruirArca);
  registerEventCues('diluvio', diluvio);
  registerEventCues('torre-de-babel', torreDeBabel);

  // Patriarcal era
  registerEventCues('nacimiento-abraham', nacimientoAbraham);
  registerEventCues('abraham-rompe-idolos', abrahamRompeIdolos);
  registerEventCues('llamado-de-abraham', llamadoDeAbraham);
  registerEventCues('pacto-de-abraham', pactoDeAbraham);
  registerEventCues('nacimiento-ismael', nacimientoIsmael);
  registerEventCues('destruccion-sodoma-gomorra', destruccionSodomaGomorra);
  registerEventCues('nacimiento-isaac', nacimientoIsaac);
  registerEventCues('akedah-sacrificio-isaac', akedahSacrificioIsaac);
  registerEventCues('muerte-sara', muerteSara);
  registerEventCues('nacimiento-jacob-esau', nacimientoJacobEsau);
  registerEventCues('jacob-roba-primogenitura', jacobRobaPrimogenitura);
  registerEventCues('escalera-de-jacob', escaleraDeJacob);
  registerEventCues('jacob-lucha-con-angel', jacobLuchaConAngel);
  registerEventCues('jose-vendido-por-hermanos', joseVendidoPorHermanos);
  registerEventCues('jose-en-egipto', joseEnEgipto);
  registerEventCues('reencuentro-jose-hermanos', reencuentroJoseHermanos);
  registerEventCues('muerte-de-jacob', muerteDeJacob);
  registerEventCues('muerte-de-jose', muerteDeJose);

  // Éxodo era
  registerEventCues('esclavitud-en-egipto', esclavitudEnEgipto);
  registerEventCues('nacimiento-moises', nacimientoMoises);
  registerEventCues('moises-mata-egipcio', moisesMataEgipcio);
  registerEventCues('zarza-ardiente', zarzaArdiente);
  registerEventCues('moises-confronta-faraon', moisesConfrontaFaraon);
  registerEventCues('diez-plagas', diezPlagas);
  registerEventCues('pesaj-primera-pascua', pesajPrimeraPascua);
  registerEventCues('salida-de-egipto', salidaDeEgipto);
  registerEventCues('cruce-del-mar-rojo', cruceDelMarRojo);
  registerEventCues('mana-y-codornices', manaYCodornices);
  registerEventCues('agua-de-la-roca', aguaDeLaRoca);
  registerEventCues('diez-mandamientos', diezMandamientos);
  registerEventCues('becerro-de-oro', becerroDeOro);
  registerEventCues('tabernaculo', tabernaculo);
  registerEventCues('doce-espias', doceEspias);
  registerEventCues('rebelion-core', rebelionCore);
  registerEventCues('moises-golpea-roca-segunda-vez', moisesGolpeaRocaSegundaVez);
  registerEventCues('serpiente-de-bronce', serpienteDeBronce);
  registerEventCues('muerte-de-aaron', muerteDeAaron);
  registerEventCues('muerte-de-moises', muerteDeMoises);

  // Reinos y Exilio era
  registerEventCues('conquista-jerico', conquistaJerico);
  registerEventCues('conquista-canaan', conquistaCanaan);
  registerEventCues('periodo-jueces', periodoJueces);
  registerEventCues('debora-profetisa', deboraProfetisa);
  registerEventCues('gedeon', gedeon);
  registerEventCues('sanson', sanson);
  registerEventCues('samuel-ultimo-juez', samuelUltimoJuez);
  registerEventCues('reinado-saul', reinadoSaul);
  registerEventCues('david-vs-goliat', davidVsGoliat);
  registerEventCues('david-rey', davidRey);
  registerEventCues('batsabe-y-natan', batsabeYNatan);
  registerEventCues('rebelion-de-absalon', rebelionDeAbsalon);
  registerEventCues('salomon-rey', salomonRey);
  registerEventCues('templo-de-salomon', templeDeSalomon);
  registerEventCues('reina-de-saba', reinaDeSaba);
  registerEventCues('division-del-reino', divisionDelReino);
  registerEventCues('elias-y-baal', eliasYBaal);
  registerEventCues('ascenso-elias', ascensoElias);
  registerEventCues('profetas-mayores', profetasMayores);
  registerEventCues('exilio-babilonico', exilioBabilonico);
  registerEventCues('daniel-en-babilonia', danielEnBabilonia);
  registerEventCues('regreso-del-exilio', regresoDelExilio);

  // Evangelio era
  registerEventCues('anunciacion', anunciacion);
  registerEventCues('visitacion-isabel', visitacionIsabel);
  registerEventCues('nacimiento-juan-bautista', nacimientoJuanBautista);
  registerEventCues('nacimiento-jesus', nacimientoJesus);
  registerEventCues('presentacion-en-el-templo', presentacionEnElTemplo);
  registerEventCues('huida-a-egipto', huidaAEgipto);
  registerEventCues('jesus-en-el-templo-12-anos', jesusEnElTemplo12Anos);
  registerEventCues('bautismo-de-jesus', bautismoDeJesus);
  registerEventCues('tentaciones-desierto', tentacionesDesierto);
  registerEventCues('eleccion-doce-apostoles', eleccionDoceApostoles);
  registerEventCues('sermon-del-monte', sermonDelMonte);
  registerEventCues('milagros-de-jesus', milagrosDeJesus);
  registerEventCues('transfiguracion', transfiguracion);
  registerEventCues('entrada-triunfal-jerusalen', entradaTriunfalJerusalen);
  registerEventCues('ultima-cena', ultimaCena);
  registerEventCues('getsemani', getsemani);
  registerEventCues('juicios-jesus', juiciosJesus);
  registerEventCues('crucifixion', crucifixion);
  registerEventCues('resurreccion', resurreccion);
  registerEventCues('ascension', ascension);
  registerEventCues('pentecostes', pentecostes);
  registerEventCues('martirio-esteban', martirioEsteban);
  registerEventCues('conversion-de-pablo', conversionDePablo);
  registerEventCues('viajes-misioneros-pablo', viajesMisionerosPablo);
  registerEventCues('muerte-pedro-pablo', muertePedroPablo);

  // Revelación era (Islamic)
  registerEventCues('nacimiento-mahoma', nacimientoMahoma);
  registerEventCues('infancia-amina-y-halima', infanciaAminaYHalima);
  registerEventCues('muerte-de-amina', muerteDeAmina);
  registerEventCues('muerte-de-abdulmuttalib', muerteDeAbdulmuttalib);
  registerEventCues('viaje-con-abu-talib-bahira', viajeConAbuTalibBahira);
  registerEventCues('matrimonio-con-khadija', matrimonioConKhadija);
  registerEventCues('revelacion-en-hira', revelacionEnHira);
  registerEventCues('predicacion-secreta', predicacionSecreta);
  registerEventCues('predicacion-publica', predicacionPublica);
  registerEventCues('migracion-a-abisinia', migracionAAbisinia);
  registerEventCues('boicot-de-quraysh', boicotDeQuraysh);
  registerEventCues('ano-de-tristeza', anoDeTristeza);
  registerEventCues('viaje-nocturno-mi-raj', viajeNocturnoMiRaj);
  registerEventCues('conversion-de-medina-ansar', conversionDeMedinaAnsar);
  registerEventCues('hegira-migracion-a-medina', hegiraMigracionAMedina);
  registerEventCues('fundacion-comunidad-medina', fundacionComunidadMedina);
  registerEventCues('batalla-de-badr', batallaDeBadr);
  registerEventCues('batalla-de-uhud', batallaDeUhud);
  registerEventCues('batalla-del-foso', batallaDelFoso);
  registerEventCues('tratado-de-hudaibiya', tratadoDeHudaibiya);
  registerEventCues('conquista-de-meca', conquistaDeMeca);
  registerEventCues('peregrinacion-de-despedida', peregrinacionDeDespedida);
  registerEventCues('muerte-de-mahoma', muerteDeMahoma);
}
