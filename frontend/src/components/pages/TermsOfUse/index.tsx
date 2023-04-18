import React from 'react'
import navigate from '../../../functions/navigate'
import Header from '../../blocks/Header'
import styles from './styles'

const TermsOfUse: React.FC = () => <>
	<Header
		title='Termos de Uso do RisQLAC'
		backButton={() => {
			navigate('/login')
		}}
	/>

	<styles.main>
		<p>
			RisQLAC é uma sigla criada para denominar o programa (software)
			Risco Químico em Laboratórios de Análises Clínicas, um produto
			tecnológico resultante da dissertação de mestrado em Análises Clínicas,
			da discente Erlayne Silvana Santiago Cavalcante, da Universidade Federal
			do Pará. O RisQLAC é um banco de dados direcionado ao armazenamento de
			informações acerca de produtos químicos perigosos, utilizados por profissionais
			e alunos de laboratórios da UFPA. É uma tecnologia educacional que visa o
			gerenciamento de risco químico por meio do Sistema Globalmente Harmonizado
			de Classificação e Rotulagem de Produtos Químicos (GHS).
		</p>
		<br />
		<p>
			A utilização do software RisQLAC inicia-se com o cadastro do usuário, que
			pode ser em duas categorias: aluno e técnico/docente. Nome, email, senha e
			laboratório vinculado são requisitos obrigatórios para entrar no sistema,
			objetivando garantir a rastreabilidade de informações. Aos(as) técnicos(as)
			e docentes são asseguradas a inserção e a edição de informações no banco de
			dados, já os alunos(as) podem apenas consultá-las. As informações lançadas
			no RisQLAC devem ser provenientes do rótulo do GHS e/ou da FISPQ do produto
			a ser cadastrado.
		</p>
		<br />
		<p>
			Usuário: é a pessoa que acessa o domínio app.risqlac.com para consulta de
			informações ou para inclusão de dados na plataforma, mediante cadastro.
		</p>
		<br />
		<p>
			Serviço: é qualquer funcionalidade do software RisQLAC ofertada ao usuário.
		</p>
		<br />
		<p>
			Ler e aceitar os termos de uso são indispensáveis e precedem o cadastro do
			usuário na plataforma. Para a finalização do cadastro, o usuário deve preencher
			todos os campos obrigatórios e manter sigilo sobre a senha criada por si,
			visto que o usuário assume a responsabilidade pelas atividades realizadas
			por meio dela. Os usuários respondem pela veracidade das informações que
			cadastrarem na plataforma.
		</p>
		<br />
		<p>
			O software RisQLAC coleta alguns dados pessoais dos usuários durante o
			cadastro para garantir a rastreabilidade. Esses dados nunca serão comercializados
			e a plataforma fará o possível para manter a confidencialidade e a segurança
			das informações dos usuários.
		</p>
	</styles.main>
</>

export default TermsOfUse
