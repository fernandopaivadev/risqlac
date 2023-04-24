import React from "react"
import navigate from "../../../functions/navigate"
import Header from "../../blocks/Header"
import styles from "./styles"
import storage from "../../../services/storage"

const TermsOfUse: React.FC = () => (
	<>
		<Header
			title="Termos de Uso do RisQLAC"
			backButton={() => {
				if (storage.read("token")) {
					navigate("/options")
				} else {
					navigate("/login")
				}
			}}
		/>

		<styles.main>
			<h2>Sobre</h2>
			<p>
				RisQLAC é uma sigla criada para denominar o programa (software)
				Risco Químico em Laboratórios de Análises Clínicas, um produto
				tecnológico resultante da dissertação de mestrado em Análises
				Clínicas, da discente Erlayne Silvana Santiago Cavalcante, da
				Universidade Federal do Pará. O RisQLAC é um banco de dados
				direcionado ao armazenamento de informações acerca de produtos
				químicos perigosos, utilizados por profissionais e alunos de
				laboratórios da UFPA. É uma tecnologia educacional que visa o
				gerenciamento de risco químico por meio do Sistema Globalmente
				Harmonizado de Classificação e Rotulagem de Produtos Químicos
				(GHS).
			</p>
			<p>
				<strong>
					Ao utilizar a plataforma RisQLAC você concorda em cumprir os
					seguintes termos de uso:
				</strong>
			</p>
			<h2>1. Propriedade Intelectual</h2>
			<p>
				Todo o conteúdo do RisQLAC, incluindo software, bancos de dados,
				textos, gráficos, imagens, logotipos, ícones, e outros materiais
				são de propriedade exclusiva da Erlayne Silvana Santiago
				Cavalcante e protegidos pelas leis de direitos autorais. Nenhum
				conteúdo do RisQLAC pode ser copiado, reproduzido, distribuído,
				transmitido, exibido ou vendido sem autorização prévia por
				escrito.
			</p>
			<h2>2. Uso Permitido </h2>
			<p>
				O RisQLAC é destinado a ser utilizado como um banco de dados
				para armazenamento de informações acerca de produtos químicos
				perigosos utilizados em laboratórios de análises clínicas. Seu
				uso é permitido para fins educacionais e de gerenciamento de
				risco químico, conforme descrito no Sistema Globalmente
				Harmonizado de Classificação e Rotulagem de Produtos Químicos
				(GHS).
			</p>
			<h2>3. Uso Proibido </h2>
			<p>
				Não é permitido utilizar o RisQLAC para atividades ilegais ou
				que violem os direitos de propriedade intelectual de terceiros.
				Também não é permitido coletar ou armazenar informações de
				usuários do RisQLAC sem autorização prévia.
			</p>
			<h2>4. Responsabilidade do Usuário </h2>
			<p>
				O usuário é responsável por garantir que as informações
				armazenadas no RisQLAC sejam precisas, atualizadas e completas.
				O usuário também é responsável por manter a confidencialidade de
				suas credenciais de acesso.
			</p>

			<h2>5. Responsabilidade da plataforma</h2>
			<p>
				O software RisQLAC coleta alguns dados pessoais dos usuários
				durante o cadastro para garantir a rastreabilidade. Esses dados
				nunca serão comercializados e é obrigação da plataforma manter a
				confidencialidade e a segurança das informações dos usuários.
			</p>

			<h2>6. Limitação de Responsabilidade</h2>
			<p>
				O RisQLAC não se responsabiliza por quaisquer danos ou prejuízos
				decorrentes do uso ou da impossibilidade de uso da plataforma,
				incluindo danos diretos, indiretos, incidentais, especiais,
				exemplares ou consequentes.
			</p>
			<h2>7. Modificações dos Termos de Uso </h2>
			<p>
				O RisQLAC se reserva o direito de modificar estes termos de uso
				a qualquer momento, sem aviso prévio. Ao continuar a utilizar a
				plataforma após a modificação dos termos, você concorda em
				cumprir as novas condições.
			</p>
			<h2>8. Jurisdição e Lei Aplicável </h2>
			<p>
				Estes termos de uso são regidos pelas leis da República
				Federativa do Brasil, sendo o foro da Comarca de Belém, Estado
				do Pará, o competente para dirimir quaisquer controvérsias
				decorrentes deste instrumento.
			</p>
		</styles.main>
	</>
)

export default TermsOfUse
