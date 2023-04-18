import React, { useState } from 'react'
import { Components } from '../../../@types'
import util from '../../../utils/styles'
import styles from './style'

import CORROSIVO from '../../../assets/CORROSIVO.png'
import EXPLOSIVO from '../../../assets/EXPLOSIVO.png'
import GAS_SOB_PRESSAO from '../../../assets/GAS_SOB_PRESSAO.png'
import INFLAMAVEL from '../../../assets/INFLAMAVEL.png'
import IRRITANTE from '../../../assets/IRRITANTE.png'
import OXIDANTE from '../../../assets/OXIDANTE.png'
import PERIGO_A_SAUDE from '../../../assets/PERIGO_A_SAUDE.png'
import PERIGO_AO_MEIO_AMBIENTE from '../../../assets/PERIGO_AO_MEIO_AMBIENTE.png'
import TOXICO from '../../../assets/TOXICO.png'

const symbolsIndex: { [key: string]: string } = {
	CORROSIVO,
	EXPLOSIVO,
	GAS_SOB_PRESSAO,
	INFLAMAVEL,
	IRRITANTE,
	OXIDANTE,
	PERIGO_A_SAUDE,
	PERIGO_AO_MEIO_AMBIENTE,
	TOXICO
}

const Symbols: React.FC<Components.Symbols> = ({ storeSymbolId, taskOnCancel }) => {
	const [error, setError] = useState(false)
	const [symbolName, setSymbolName] = useState<string>()

	return <styles.main>
		<styles.window>
			{symbolName && symbolsIndex[symbolName] ?
				<img
					src={symbolsIndex[symbolName]}
					alt='Sem imagem'
				/>
				: null
			}

			<>
				<select
					id='select'
					onChange={event => {
						setSymbolName(
							String(event.target.value).toUpperCase()
						)
					}}
				>

					<option>Escolha o pictograma</option>
					{Object.keys(symbolsIndex).map(item =>
						<option>{item.toUpperCase()}</option>
					)}
				</select>

				<div className='buttons'>
					<util.classicButton
						onClick={() => {
							if (symbolName) {
								storeSymbolId(symbolName)
							} else {
								setError(true)
								setTimeout(() => {
									setError(false)
								}, 3000)
							}
						}}
					>
						Selecionar
					</util.classicButton>

					<util.criticalButton
						onClick={taskOnCancel}
					>
						Cancelar
					</util.criticalButton>
				</div>
			</>

			{error ?
				<p className='error-message'>
					Por favor escolha um pictograma
				</p>
				: null
			}
		</styles.window>
	</styles.main>
}

export default Symbols
