import Dockerode, { Container } from 'dockerode';
import { v4 as uuid } from 'uuid';
import { DockerContainerInfo } from '../@types';
const docker = new Dockerode();

export const createNewDockerContainer = async ({
  VIDEO_URL,
  TOKEN,
}: DockerContainerInfo) => {
  try {
    const containerName: string = `file-Formatter-${uuid()}`;
    const container: Container = await docker.createContainer({
      Image: 'file-formatter',
      name: containerName,
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: false,
      StdinOnce: false,
      Env: [VIDEO_URL, TOKEN],
    });
    return container;
  } catch (error) {
    throw error;
  }
};
