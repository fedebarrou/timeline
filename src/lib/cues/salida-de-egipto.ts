import type { Cue } from '../narrationCues';

/**
 * Cues for "Salida de Egipto".
 * Pins: moises(0), aaron(1).
 */
const CUES: Cue[] = [
  // Faraón despide al pueblo
  { match: /levantaos.{0,15}salid|despidi[óo] al pueblo|Fara[óo]n.{0,15}llama.{0,15}noche|todos somos muertos/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Caravana en marcha — journey
  { match: /salieron|partieron|marcha.{0,15}desierto|caravana|de Rames[ée]s a Sucot|sal[íi] con mis siervos/i, cueId: 'fx:journey-trace', data: { from: [515, 408], to: [525, 411] } },
  // Plata, oro y vestidos
  { match: /plata.{0,10}oro|despoja|pidieron.{0,10}egipcios|riqueza|vestidos/i, cueId: 'fx:glow-pulse', data: { position: [515, 408], color: '#ffd27a' } },
  // Columna de nube / fuego
  { match: /columna de nube|columna de fuego|nube.{0,15}d[íi]a|fuego.{0,15}noche|presencia divina/i, cueId: 'fx:halo-divine', data: { position: [520, 410] } },
  // Columna de fuego figurativa — pilar vertical luminoso
  { match: /columna de fuego|columna de nube|nube.{0,15}d[íi]a|fuego.{0,15}noche|gu[ií]a.{0,15}columna/i, cueId: 'fx:pillar-of-fire', data: { position: [520, 410] } },
  // 600.000 hombres / multitud
  { match: /seiscientos mil|600.000|600\.000|multitud mixta|erev rav/i, cueId: 'fx:dust-burst', data: { position: [520, 410] } },
  // Huesos de José
  { match: /huesos de Jos[ée]|juramento.{0,15}Jos[ée]|llevar mis huesos/i, cueId: 'fx:scroll-unfurl', data: { position: [515, 408] } },
  // Salida nocturna (Corán)
  { match: /sal.{0,5} de noche|de noche.{0,10}(sal|persegu)|sacar.{0,10}siervos de noche/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
];

export default CUES;
