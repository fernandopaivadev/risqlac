import React from 'react'
import styles from './styles'

import rotulo from '../../../assets/rotulo.png'
import navigate from '../../../functions/navigate'
import Header from '../../blocks/Header'

import CORROSIVO from '../../../assets/CORROSIVO.png'
import EXPLOSIVO from '../../../assets/EXPLOSIVO.png'
import GAS_SOB_PRESSAO from '../../../assets/GAS_SOB_PRESSAO.png'
import INFLAMAVEL from '../../../assets/INFLAMAVEL.png'
import IRRITANTE from '../../../assets/IRRITANTE.png'
import OXIDANTE from '../../../assets/OXIDANTE.png'
import PERIGO_A_SAUDE from '../../../assets/PERIGO_A_SAUDE.png'
import PERIGO_AO_MEIO_AMBIENTE from '../../../assets/PERIGO_AO_MEIO_AMBIENTE.png'
import TOXICO from '../../../assets/TOXICO.png'

const About: React.FC = () => <>
	<Header
		title='Sobre o RisQLAC'
		backButton={() => {
			navigate('/options')
		}}
	/>

	<styles.main>
		<div className='container'>
			<p className='section-title'>
				Quem somos
			</p>
			<p className='text'>
				Idealizadora e responsável pelo conteúdo: Erlayne Silvana Santiago Cavalcante,
				biomédica, especialista em Gestão e Controle de Qualidade Laboratorial/UFPA.
			</p>
			<p className='text'>
				Desenvolvedor do programa: Fernando Paiva, engenheiro da computação.
			</p>

			<p className='section-title'>
				Contato
			</p>
			<p className='text'>
				erlayne.cavalcante@ufpa.br
				fernandopaivaec@gmail.com
			</p>
			<br />

			<p className='section-title'>
				Licença de uso
			</p>
			<p className='text'>
				CC BY NC SA 4.0 Creative Commons
			</p>
			<br />

			<p className='section-title'>
				Sobre o GHS
			</p>
			<p className='text'>
				O Sistema Global de Harmonização de Classificação e Rotulagem de Produtos
				Químicos (GHS) é um conjunto de critérios harmonizados desenvolvido pelas
				Nações Unidas (ONU), objetivando proteger a saúde das pessoas, o meio ambiente,
				além de facilitar o comércio de produtos químicos no mundo. É uma ferramenta
				de gestão que existe desde 2003 e está implantado em vários países. Desde
				2015, por meio da Portaria nº 229 do Ministério do Trabalho e Emprego, os
				fornecedores de produtos químicos no Brasil são obrigados a aplicar a
				classificação e a rotulagem de substâncias e misturas de forma harmonizada,
				bem como disponibilizar a Ficha de Informação de Segurança de Produto
				Químico (FISPQ) do produto químico perigoso fabricado ou importado.
			</p>
			<br />

			<p className='text'>
				O GHS classifica as substâncias químicas e as misturas de acordo com os
				perigos físicos, à saúde e ao meio ambiente. As 9 classes de perigo são:
				inflamáveis, oxidantes, corrosivos, tóxicos, irritantes, gases sob pressão,
				explosivos, perigos à saúde e perigo ambiental. Sendo assim, na descrição
				do rótulo de um produto químico perigoso devem estar presentes identificação
				e composição, pictograma de perigo, palavra de advertência, frase de perigo,
				frase de precaução e informações suplementares, segundo a legislação brasileira.
			</p>
			<br />

			<p className='title'>
				Exemplo de um rótulo:
			</p>
			<img src={rotulo}>
			</img>

			<p className='section-title'>
				As classes do GHS
			</p>
			<ul>
				<li>
					<p className='title'>
						Inflamável
					</p>
					<p className='text'>
						Engloba as substâncias químicas que entram em ignição sob uma fonte de calor. Seu símbolo representativo é uma chama. Os produtos químicos inflamáveis são bastante comuns em laboratórios clínicos. Exemplos: álcool etílico e álcool metílico.
					</p>
				</li >
				<img src={INFLAMAVEL} />

				<li>
					<p className='title'>
						Oxidante
					</p>
					<p className='text'>
						Classe representada por uma chama sobre um círculo. Uma substância oxidante é instável por facilmente liberar oxigênio, o que pode intensificar um incêndio quando em contato com um produto inflamável.
					</p>
					<img src={OXIDANTE} />
				</li >
				<li>
					<p className='title'>
						Explosiva
					</p>
					<p className='text'>
						Reúne aqueles agentes químicos, como substâncias ou misturas auto - reativas e alguns peróxidos orgânicos, capazes de iniciar um processo destrutivo por meio de uma intensa liberação de energia.É a classe representada por uma bomba explodindo.
					</p >
					<img src={EXPLOSIVO} />
				</li >
				<li>
					<p className='title'>
						Gás sob pressão
					</p>
					<p className='text'>
						Classe que contêm os gases que podem explodir em contato com o calor: gás comprimido, gás liquefeito, gás liquefeito refrigerado e gás dissolvido.
					</p >
					<img src={GAS_SOB_PRESSAO} />
				</li >
				<li>
					<p className='title'>
						Irritante
					</p>
					<p className='text'>
						O ponto de exclamação alerta para a presença de substância ou mistura irritante.Ele indica perigo de irritação na pele, dano ocular ou toxicidade a determinados órgãos, o que pode ocorrer por inalação ou absorção do agente químico pertencente a esta classe.
					</p>
					<img src={IRRITANTE} />
				</li >
				<li>
					<p className='title'>
						Perigo à saúde
					</p>
					<p className='text'>
						O símbolo desta classe revela perigos de mutagenicidade, carcinogenicidade e toxicidade reprodutiva, agravos que podem despontar a partir da aspiração do produto químico, detentor de tal símbolo, após exposição única ou repetida a ele.
					</p >
					<img src={PERIGO_A_SAUDE} />
				</li >
				<li>
					<p className='title'>
						Tóxico
					</p>
					<p className='text'>
						As substâncias ou misturas altamente tóxicas por inalação, ingestão ou absorção pela pele, as quais provocam danos gravíssimos à saúde ou morte, devem exibir o símbolo contendo uma caveira e ossos cruzados. Exemplo: clorofórmio.
					</p >
					<img src={TOXICO} />
				</li >
				<li>
					<p className='title'>
						Corrosivo
					</p>
					<p className='text'>
						Nesta classe estão os produtos químicos com potencial para destruir tecidos vivos e materiais inertes. Alguns exemplos: ácido acético, ácido sulfúrico, hipoclorito de sódio e hidróxido de sódio.
					</p >
					<img src={CORROSIVO} />
				</li >
				<li>
					<p className='title'>
						Perigo ao meio ambiente
					</p>
					<p className='text'>
						As substâncias ou misturas que acarretam malefícios aos organismos aquáticos carregam a simbologia representante desta classe.
					</p >
					<img src={PERIGO_AO_MEIO_AMBIENTE} />
				</li >
			</ul >
		</div>
	</styles.main >
</>

export default About
